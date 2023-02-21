import express from "express"
import { WebSocketServer } from "ws"
import process from "process";
import { v4 as uuidv4 } from "uuid"
import { Connection } from "./connection/connection";

const app = express();
const port = 8080;

app.get("/message", (req, res) => {
    res.send("Hello world!")
});

// start the Express server
const server = app.listen(port, () => {
    console.log("Pod IP: " + process.env.POD_IP);
    console.log(`server started at http://localhost:${port}`)
});

const webSocketServer = new WebSocketServer({ noServer: true });
const websocketServerId = uuidv4()

server.on('upgrade', function upgrade(request, socket, head) {
    // TODO: auth and destory socket if it fails auth.
    webSocketServer.handleUpgrade(request, socket, head, function done(ws) {
        // TODO: figure out if you need to add this to a list of connections so garbage collection doesn't kill it.    
        new Connection(websocketServerId, ws)
    });
});

// Making sure the process exits on ctrl + c.
process.on('SIGINT', function () {
    console.log("Caught interrupt signal")

    process.exit()
});