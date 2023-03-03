export class GraphqlRequestor {
    private endpoint: string

    constructor(host: string, port: number){
        this.endpoint = `http://${host}:${port}/graphql`
    }

    public async sendRequest(query: any, variables: any): Promise<any> {
        const response = await fetch(this.endpoint, {
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

        const data = await response.json()
        return data
    }
}