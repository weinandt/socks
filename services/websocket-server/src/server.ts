import { WebSocketServer } from "ws"
import { runDI } from "./manualDi";
import process from "process";
import { v4 as uuidv4 } from "uuid"
import { Connection } from "./connection/connection";
import { ConnectionManagementGateway } from "./connection/connectionManagementGateway";
import { GraphqlRequestor } from "./graphqlRequestor/graphqlRequestor";
import { createGraphqlApp } from "./app";

const di = runDI()
const app = createGraphqlApp(di.resolvers)

const config = {
    connectionManagementApiHost: "connection-api",
    connectionManagementApiPort: 3000,
    websocketPath: "/connect",
    serverPort: 8080,
}

// start the Express server
const server = app.listen(config.serverPort, () => {
    console.log("Pod IP: " + process.env.POD_IP);
    console.log(`server started at http://localhost:${config.serverPort}`)
    console.log(`Websocket path: ${config.websocketPath}`)
    console.log(`Graphql path: /graphql`)
});

const webSocketServer = new WebSocketServer({ noServer: true, path: config.websocketPath });
const websocketServerId = uuidv4()
const holdingServerIp = process.env.POD_IP ?? "localhost"

// TODO: seperate into manualDi.ts
const connectionApiGraphqlRequestor = new GraphqlRequestor(config.connectionManagementApiHost, config.connectionManagementApiPort)
const connectionManagementGateway = new ConnectionManagementGateway(websocketServerId, holdingServerIp, connectionApiGraphqlRequestor)


server.on('upgrade', function upgrade(request, socket, head) {
    // TODO: auth and destory socket if it fails auth.
    webSocketServer.handleUpgrade(request, socket, head, async function done(ws) {
        // TODO: figure out if you need to add this to a list of connections so garbage collection doesn't kill it.
        
        await Connection.createConnection(connectionManagementGateway, "fake tenantID", ws)
    });
});


// Making sure the process exits on ctrl + c.
process.on('SIGINT', function () {
    console.log("Caught interrupt signal")

    process.exit()
});