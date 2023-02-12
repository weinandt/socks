import express from "express"
import { ConnectionInteractor } from "./connections/connectionInteractor"
import { WebsocketServerGateway } from "./connections/websocketServerGateway"

const config = {
    websocketServerPort: 8080,
}

function createInteractors() {
    const websocketServerGateway = new WebsocketServerGateway(config.websocketServerPort)
    const connectionInteractor = new ConnectionInteractor(websocketServerGateway)

    return {
        connectionInteractor,
    }
}

export function registerHandlers(app: express.Application) {
    const interactors = createInteractors()

    // Called when a new websocket connection is made.
    app.post('/connections', (req, res) => {
        interactors.connectionInteractor.registerConnection(req.body)

        return res.status(201).json(req.body)
    });

    app.post('/disconnect', (req, res) => {
        interactors.connectionInteractor.unregisterConnection(req.body)

        return res.status(202)
    })

    app.post('/sendMessage', (req, res) => {
        interactors.connectionInteractor.sendMessageToTenant(req.body)

        return res.status(202)
    })
}