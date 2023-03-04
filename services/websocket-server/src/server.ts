import { runDI } from "./manualDi";
import process from "process";
import { IncomingMessage } from "http";

const config = {
    connectionManagementApiHost: "connection-api",
    connectionManagementApiPort: 3000,
    websocketPath: "/connect",
    serverPort: 8080,
    holdingServerIp: process.env.POD_IP ?? "localhost",
}

const { app, websocketApp } = runDI(config)

// start the Express server
const server = app.listen(config.serverPort, () => {
    console.log(`server started at http://localhost:${config.serverPort}`)
    console.log(`Websocket path: ${config.websocketPath}`)
    console.log(`Graphql path: /graphql`)
});

server.on('upgrade', (request, socket, head) => websocketApp.onUpgrade(request, socket, head));


// Making sure the process exits on ctrl + c.
process.on('SIGINT', function () {
    console.log("Caught interrupt signal")

    process.exit()
});