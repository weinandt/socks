import { createGraphqlApp } from "./graphqlApp";
import express from 'express'
import { WebsocketApp } from "./websocketApp";
import { GraphqlRequestor } from "./graphqlRequestor/graphqlRequestor";
import { ConnectionManagementGateway } from "./connection/connectionManagementGateway";
import { v4 as uuidv4 } from "uuid"
import { WebSocketServer } from "ws";

interface Interactors {
    //connectionInteractor: ConnectionInteractor
    //messageInteractor: MessageInteractor
}

function createResolvers(interactors: Interactors) {
    return {
        Query: {
            curTime: () => new Date().toISOString()
        },
        Mutation: {
            onMesssageForTenant: (parent: any, args: any, context: any, info: any) => console.log(args.input),
        },
    };
}

export function runDI(config: any) {
    // Express
    const app = express()
    app.use(express.json())

    // Graphql stuff
    const interactors: Interactors = {
        // connectionInteractor,
        //  messageInteractor,
    }

    const resolvers = createResolvers(interactors)
    const graphqlApp = createGraphqlApp(app, resolvers)

    // Websocket stuff.
    const websocketServerId = uuidv4()
    const connectionApiGraphqlRequestor = new GraphqlRequestor(config.connectionManagementApiHost, config.connectionManagementApiPort)
    const connectionManagementGateway = new ConnectionManagementGateway(websocketServerId, config.holdingServerIp, connectionApiGraphqlRequestor)
    const webSocketServer = new WebSocketServer({ noServer: true, path: config.websocketPath });
    const websocketApp = new WebsocketApp(webSocketServer, connectionManagementGateway)

    return {
        app,
        websocketApp,
    }
}