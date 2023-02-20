export interface HoldingServer {
    serverId: string
    ipAddress: string
}

export interface Connection {
    connectionId: string
    tenantId: string
    holdingServer: HoldingServer
}