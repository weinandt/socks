import { RawData, WebSocket } from "ws"
import { ConnectionManagementGateway } from "./connectionManagementGateway"
import { v4 as uuidv4 } from "uuid"

export class Connection {
    private constructor(private connectionId: string, private tenantId: string, private ws: WebSocket, private connectionManagementGateway: ConnectionManagementGateway) {
        ws.on('message', (data) => this.onMessage(data));
        ws.on('close', () => this.onClose());
    }

    public static async createConnection(connectionManagementGateway: ConnectionManagementGateway, tenantId: string, ws: WebSocket): Promise<Connection> {
        const connectionId = uuidv4()


        await connectionManagementGateway.registerConnection(connectionId, tenantId)

        return new Connection(connectionId, tenantId, ws, connectionManagementGateway)
    }

    private onClose() {
        // TODO: call registration api to de-register.
        console.log('disconnected');
    }

    private onMessage(data: RawData) {
        // TODO: should add more checking that data isn't null, and is utf-8, and enfornce a messaging schema here.
        this.connectionManagementGateway.sendMessageToTenant(this.connectionId, this.tenantId, data.toString())
        console.log(`Received message ${data}`);
    }
}