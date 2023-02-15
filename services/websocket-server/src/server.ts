import express from "express"
import { WebSocketServer } from "ws"
import process from "process";


const app = express();
const port = 8080;

// define a route handler for the default home page
app.get("/message", (req, res) => {
    res.send("Hello world!")
});

// start the Express server
const server = app.listen(port, () => {
    console.log("Pod IP: " + process.env.POD_IP);
    console.log(`server started at http://localhost:${port}`)
});

const webSocketServer = new WebSocketServer({ noServer: true });

// @ts-ignore
webSocketServer.on('connection', function connection(ws, request) {
    console.log("new connection")

    // @ts-ignore
    ws.on('message', function message(data) {
        console.log(`Received message ${data}`);
    });
});

server.on('upgrade', function upgrade(request, socket, head) {
    // TODO: auth and destory socket if it fails auth.
    webSocketServer.handleUpgrade(request, socket, head, function done(ws) {
        // @ts-ignore
        webSocketServer.emit('connection', ws, request);
    });
});

// Making sure the process exits on ctrl + c.
process.on('SIGINT', function () {
    console.log("Caught interrupt signal")

    process.exit()
});