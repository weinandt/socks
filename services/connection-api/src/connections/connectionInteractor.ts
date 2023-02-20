import { Connection } from "./connection";
import { ConnectionManagementGateway } from "./connectionManagementGateway";

export class ConnectionInteractor {
    private connectionManagementGateway: ConnectionManagementGateway

    constructor(connectionManagementGateway: ConnectionManagementGateway) {
        this.connectionManagementGateway = connectionManagementGateway
    }

    public registerConnection(connection: Connection) {
        return this.connectionManagementGateway.registerConnection(connection)
    }

    public deleteConnection(tenantId: string, connectionId: string) {
        return this.connectionManagementGateway.deleteConnection(tenantId, connectionId)
    }
}