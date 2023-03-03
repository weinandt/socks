import { ConnectionInteractor } from "./connections/connectionInteractor";
import { ConnectionManagementGateway } from "./connections/connectionManagementGateway";
import { MessageInteractor } from "./messaging/messageInteractor";

interface Interactors {
    connectionInteractor: ConnectionInteractor
    messageInteractor: MessageInteractor
}

function createResolvers(interactors: Interactors) {
    return {
        Query: {
            curTime: () => new Date().toISOString()
        },
        Mutation: {
            registerConnection: (parent:any, args: any, context: any, info: any) => interactors.connectionInteractor.registerConnection(args.input),
            deleteConnection: (parent:any, args: any, context: any, info: any) => interactors.connectionInteractor.deleteConnection(args.tenantId, args.connectionId),
            sendMessageToTenant: (parent: any, args: any, context: any, Info: any) => interactors.messageInteractor.sendMessageToAllClientsInTenant(args.input)
        },
    };
}

export function runDI() {
    const connectionManagementGateway = new ConnectionManagementGateway()
    const connectionInteractor = new ConnectionInteractor(connectionManagementGateway)
    const messageInteractor = new MessageInteractor()

    const interactors: Interactors = {
        connectionInteractor,
        messageInteractor,
    }

    return {
        resolvers: createResolvers(interactors),
    }
}