
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
            onMesssageForTenant: (parent:any, args: any, context: any, info: any) => console.log(args.input),
        },
    };
}

export function runDI() {
   /* const connectionManagementGateway = new ConnectionManagementGateway()
    const connectionInteractor = new ConnectionInteractor(connectionManagementGateway)
    const messageInteractor = new MessageInteractor()
*/
    const interactors: Interactors = {
       // connectionInteractor,
      //  messageInteractor,
    }

    return {
        resolvers: createResolvers(interactors),
    }
}