export class MessageInteractor {
    public async sendMessageToAllClientsInTenant({senderClientId, tenantId, message}: {senderClientId: string, tenantId: string, message: string}) {
        // TODO: eventually this lookup will hit a db and need to be async.
        // TODO: should send multiple messages at once.

        // TODO: call each websocket endpoint.

        console.log(senderClientId, tenantId, message)
    }
}