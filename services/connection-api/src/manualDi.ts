import { ConnectionInteractor } from "./connections/connectionInteractor";
import { ConnectionManagementGateway } from "./connections/connectionRegistrationGateway";

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
            deleteConnection: (parent:any, args: any, context: any, info: any) => interactors.connectionInteractor.deleteConnection(args.tenantId, args.connectionId),
        },
    };
}

export function runDI() {
    const connectionManagementGateway = new ConnectionManagementGateway()
    const connectionInteractor = new ConnectionInteractor(connectionManagementGateway)

    const interactors: Interactors = {
        connectionInteractor,
    }

    return {
        resolvers: createResolvers(interactors),
    }
}