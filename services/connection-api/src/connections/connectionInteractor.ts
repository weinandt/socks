import { Connection } from "./connection";
import { ConnectionManagementGateway } from "./connectionManagementGateway";

export class ConnectionInteractor {
    constructor(private connectionManagementGateway: ConnectionManagementGateway) {}

    public registerConnection(connection: Connection) {
        return this.connectionManagementGateway.registerConnection(connection)
    }

    public deleteConnection(tenantId: string, connectionId: string) {
        return this.connectionManagementGateway.deleteConnection(tenantId, connectionId)
    }
}