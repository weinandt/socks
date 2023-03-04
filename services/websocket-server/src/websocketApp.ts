import { IncomingMessage } from "http";
import internal from "stream";
import { WebSocketServer, WebSocket } from "ws";
import { Connection } from "./connection/connection";
import { ConnectionManagementGateway } from "./connection/connectionManagementGateway";

export class WebsocketApp {
    private connectionMap: Map<string, Connection> = new Map()
    private tenantIdToConnectionIdMap: Map<string, Set<string>> = new Map()

    constructor(private wss: WebSocketServer, private connectionManagementGateway: ConnectionManagementGateway) {}

    public onUpgrade(request: IncomingMessage, socket: internal.Duplex, head: Buffer) {
        const connectionGateway = this.connectionManagementGateway
    
        // TODO: auth and destory socket if it fails auth.
        this.wss.handleUpgrade(request, socket, head, async (ws: WebSocket, req: IncomingMessage) => {
            // TODO: do auth and lookup tenantId.
            const tenantId = "fake-tenant-id"
            const newConnection = await Connection.createConnection(connectionGateway, tenantId, ws, (connection:Connection) => this.onConnectionClose(connection))
            
            // Keeping track of the connection in multiple dictionaries.
            this.connectionMap.set(newConnection.connectionId, newConnection)
            let connectionSet = this.tenantIdToConnectionIdMap.get(newConnection.tenantId)
            if (connectionSet == null) {
                connectionSet = new Set()
                this.tenantIdToConnectionIdMap.set(newConnection.tenantId, connectionSet)
            }
            
            connectionSet.add(newConnection.connectionId)
        });
    };

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