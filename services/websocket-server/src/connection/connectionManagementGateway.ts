export class ConnectionManagementGateway {
    constructor(private connectionApiHost: string, private connectionApiPort: number, private holdingServerId: string, private holdingServerIpAddress: string) { }

    public async registerConnection(connectionId: string, tenantId: string) {
        const url = `http://${this.connectionApiHost}:${this.connectionApiPort}/graphql`

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

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            })
        })

        // TODO: handle errors.
        const data = await response.json()
        console.log(data)
    }
}