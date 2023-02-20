import { Connection } from "./connection";

export class ConnectionManagementGateway {
    // This should eventually move to a database rather than in memory (so more than one api server can be used).
    private tenantGroups = new Map<string, Map<string, Connection>>()
    
    public getConnectionsForTenant(tenantId: string): Iterable<Connection> {
        const tenantGroup = this.tenantGroups.get(tenantId)
        if (tenantGroup != null) {
            return tenantGroup.values()
        }

        return []
     }

     public registerConnection(connection: Connection): Connection{
        let tenantGroup = this.tenantGroups.get(connection.tenantId)
        if (tenantGroup == null) {
            tenantGroup = new Map<string, Connection>()
            this.tenantGroups.set(connection.tenantId, tenantGroup)
        }

        tenantGroup.set(connection.connectionId, connection)

        return connection
     }

     public deleteConnection(tenantId: string, connectionId: string) {
        const tenantGroup = this.tenantGroups.get(tenantId)
        if (tenantGroup != null) {
            tenantGroup.delete(connectionId)

            if (tenantGroup.size == 0) {
                this.tenantGroups.delete(tenantId)
            }
        }

        return connectionId
     }
}