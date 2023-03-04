import { RawData, WebSocket } from "ws"
import { ConnectionManagementGateway } from "./connectionManagementGateway"
import { v4 as uuidv4 } from "uuid"

export class Connection {
    private constructor(public connectionId: string, public tenantId: string, private ws: WebSocket, private connectionManagementGateway: ConnectionManagementGateway, private onCloseNotifier: (connection: Connection)=> void) {
        ws.on('message', (data) => this.onMessage(data));
        ws.on('close', () => this.onClose());
    }

    public static async createConnection(connectionManagementGateway: ConnectionManagementGateway, tenantId: string, ws: WebSocket, onCloseNotifier: (connection: Connection)=> void): Promise<Connection> {
        const connectionId = uuidv4()


        await connectionManagementGateway.registerConnection(connectionId, tenantId)

        return new Connection(connectionId, tenantId, ws, connectionManagementGateway, onCloseNotifier)
    }

    private onClose() {
        // Notifying the server to clean up the connection.
        this.onCloseNotifier(this)
    }

    private onMessage(data: RawData) {
        // TODO: should add more checking that data isn't null, and is utf-8, and enfornce a messaging schema here.
        this.connectionManagementGateway.sendMessageToTenant(this.connectionId, this.tenantId, data.toString())
        console.log(`Received message ${data}`);
    }
}