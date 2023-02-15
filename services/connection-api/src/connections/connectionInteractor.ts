import { Connection } from "./connection";
import { Message } from "./message";
import { WebsocketServerGateway } from "./websocketServerGateway";

export class ConnectionInteractor {
     // This should eventually move to a database rather than in memory (so more than one api server can be used).
     private tenantGroups = new Map<string, Map<string, Connection>>()
     private websocketServerGateway: WebsocketServerGateway

     constructor(websocketServerGateway: WebsocketServerGateway) {
        this.websocketServerGateway = websocketServerGateway
     }

     private getConnectionsForTenant(tenantId: string): Iterable<Connection> {
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

     public sendMessageToTenant(message: Message) {
        const connections = this.getConnectionsForTenant(message.tenantId)

        // TODO: This should use some sort of http agent to limit the number of concurrent calls.
        // TODO: unit test not sending message to sender.
        for (let connection of connections) {
            if (connection.connectionId == message.senderId) {
                // Not sending message to sender of message.
                continue
            }

            this.websocketServerGateway.sendMessage(message, connection)
        }
     }

     public unregisterConnection(connection: Connection) {
        const tenantGroup = this.tenantGroups.get(connection.tenantId)
        if (tenantGroup != null) {
            tenantGroup.delete(connection.connectionId)

            if (tenantGroup.size == 0) {
                this.tenantGroups.delete(connection.tenantId)
            }
        }
     }
}