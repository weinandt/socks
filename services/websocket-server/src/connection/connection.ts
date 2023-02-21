import { RawData, WebSocket } from "ws"

export class Connection {
    private serverId: string
    private websocket: WebSocket

    constructor(serverId: string, ws: WebSocket) {
        this.serverId = serverId
        this.websocket = ws

        ws.on('message', (data) => this.onMessage(data));
        ws.on('close', () => this.onClose());
    }

    private onClose() {
        // TODO: call registration api to de-register.
        console.log('disconnected');
    }

    private onMessage(data: RawData) {
        console.log(`Received message ${data}`);
    }
}