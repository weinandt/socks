import { ConnectionInteractor } from "./connections/connectionInteractor";
import { WebsocketServerGateway } from "./connections/websocketServerGateway";

interface Interactors {
    connectionInteractor: ConnectionInteractor
}

function createResolvers(interactors: Interactors) {
    return {
        Query: {
            curTime: () => new Date().toISOString()
        },
        Mutation: {
            registerConnection: (parent:any, args: any, context: any, info: any) => interactors.connectionInteractor.registerConnection(args.input),
        },
    };
}

const config = {
    websocketServerPort: 3000,
}

export function runDI() {
    const websocketServerGateway = new WebsocketServerGateway(config.websocketServerPort)
    const connectionInteractor = new ConnectionInteractor(websocketServerGateway)


    const interactors: Interactors = {
        connectionInteractor,
    }

    return {
        resolvers: createResolvers(interactors),
    }
}