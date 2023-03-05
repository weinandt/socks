import { IncomingMessage } from "http";
import internal from "stream";
import { WebSocketServer, WebSocket } from "ws";
import { Connection } from "./connection/connection";
import { ConnectionManagementGateway } from "./connection/connectionManagementGateway";

export class WebsocketApp {
    private connectionMap: Map<string, Connection> = new Map()
    private tenantIdToConnectionIdMap: Map<string, Set<string>> = new Map()

    constructor(private wss: WebSocketServer, private connectionManagementGateway: ConnectionManagementGateway) { }

    public onUpgrade(request: IncomingMessage, socket: internal.Duplex, head: Buffer) {
        const connectionGateway = this.connectionManagementGateway

        // TODO: auth and destory socket if it fails auth.
        this.wss.handleUpgrade(request, socket, head, async (ws: WebSocket, req: IncomingMessage) => {
            // TODO: do auth and lookup tenantId.
            const tenantId = "fake-tenant-id"

            try {
                const newConnection = await Connection.createConnection(connectionGateway, tenantId, ws, (connection: Connection) => this.onConnectionClose(connection))
                // Keeping track of the connection in multiple dictionaries.
                this.connectionMap.set(newConnection.connectionId, newConnection)
                let connectionSet = this.tenantIdToConnectionIdMap.get(newConnection.tenantId)
                if (connectionSet == null) {
                    connectionSet = new Set()
                    this.tenantIdToConnectionIdMap.set(newConnection.tenantId, connectionSet)
                }

                connectionSet.add(newConnection.connectionId)
            }
            catch(err: any) {
                console.log(`Error establishing a new connection.`)

                try {
                    ws.close()
                }
                catch(err: any) {
                    console.log(`error closing connection after attempting to register`, err)
                }
            }
        });
    };

    public async sendMessageToTenant(senderClientId: string, tenantId: string, message: string): Promise<void> {
        // Creating a list of connections to send the message to.
        const clientList: Connection[] = []
        const idsForTenant = this.tenantIdToConnectionIdMap.get(tenantId)
        if (idsForTenant != null) {
            idsForTenant.forEach(id => {
                const connection = this.connectionMap.get(id)
                if (connection != null && connection.connectionId != senderClientId) {
                    // Not adding sender to list of connections to receive the message.
                    clientList.push(connection)
                }
            })
        }

        const sendMessagePromises = clientList.map(client => {
            return client.sendMessage(message)
        })

        await Promise.allSettled(sendMessagePromises)
    }

    private onConnectionClose(connection: Connection) {
        // Removing from connection map and tenant map.
        if (this.connectionMap.has(connection.connectionId)) {
            this.connectionMap.delete(connection.connectionId)
        }

        const connectionSet = this.tenantIdToConnectionIdMap.get(connection.tenantId)
        if (connectionSet != null && connectionSet.has(connection.connectionId)) {
            connectionSet.delete(connection.connectionId)

            if (connectionSet.size == 0) {
                this.tenantIdToConnectionIdMap.delete(connection.tenantId)
            }
        }

        console.log(`Removed connectionid=${connection.connectionId}`)
    }
}