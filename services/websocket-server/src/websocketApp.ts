import { Express } from "express"
import { IncomingMessage } from "http";
import internal from "stream";
import { WebSocketServer, WebSocket } from "ws";
import { Connection } from "./connection/connection";
import { ConnectionManagementGateway } from "./connection/connectionManagementGateway";

export class WebsocketApp {
    constructor(private wss: WebSocketServer, private connectionManagementGateway: ConnectionManagementGateway) {}

    public onUpgrade(request: IncomingMessage, socket: internal.Duplex, head: Buffer) {
        const connectionGateway = this.connectionManagementGateway

        // TODO: auth and destory socket if it fails auth.
        this.wss.handleUpgrade(request, socket, head, async function done(ws: WebSocket, req: IncomingMessage) {
            // TODO: figure out if you need to add this to a list of connections so garbage collection doesn't kill it.
            
            await Connection.createConnection(connectionGateway, "fake tenantID", ws)
        });
    };
}