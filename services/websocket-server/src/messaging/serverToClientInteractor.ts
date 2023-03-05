interface ServerClientMediator {
    sendMessageToTenant(senderClientId: string, tenantId: string, message: string): Promise<void>
}

export class ServerToClientInteractor {
    constructor(private serverClientMediator: ServerClientMediator){}

    public sendMessageToTenant(input: {senderClientId: string, tenantId: string, message: string}): Promise<void> {
        return this.serverClientMediator.sendMessageToTenant(input.senderClientId, input.tenantId, input.message)
    }
}