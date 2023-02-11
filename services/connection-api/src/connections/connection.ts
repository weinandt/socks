interface ConnectionConfig {
    connectionId: string
    tenantId: string
}

export class Connection {
    connectionId: string
    tenantId: string

    constructor(connectionConfig: ConnectionConfig) {
        this.connectionId = connectionConfig.connectionId
        this.tenantId = connectionConfig.tenantId
    }
}