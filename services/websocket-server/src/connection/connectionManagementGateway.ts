import { GraphqlRequestor } from "../graphqlRequestor/graphqlRequestor"

export class ConnectionManagementGateway {
    constructor(private holdingServerId: string, private holdingServerIpAddress: string, private graphqlRequestor: GraphqlRequestor) { }

    public async registerConnection(connectionId: string, tenantId: string) {
        const query = `mutation RegisterConnection($input: RegisterConnectionInput!) {
            registerConnection(input: $input) {
                id
            }
        }`

        const variables = {
            input: {
                id: connectionId,
                tenantId: tenantId,
                holdingServer: {
                    id: this.holdingServerId,
                    ipAddress: this.holdingServerIpAddress,
                }
            }
        }

        return this.graphqlRequestor.sendRequest(query, variables)
    }

    public async sendMessageToTenant(senderClientId: string, tenantId: string, message: string) {
        const query = `mutation SendMessageToTenant($input: SendMessageToTenantInput!) {
            sendMessageToTenant(input: $input)
        }`

        const variables = {
            input: {
                senderClientId,
                tenantId,
                message,
            }
        }

        try {
            const data = await this.graphqlRequestor.sendRequest(query, variables)
            console.log("Sent message", data)
        }
        catch(err: any) {
            console.log("Problem sending request to connection api", err)
        }
    }
}