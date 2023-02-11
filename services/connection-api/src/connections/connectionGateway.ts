import { Connection } from "./connection";

export class ConnectionGateway {
    // This should eventually move to a database rather than in memory (so more than one api server can be used).
    private inMemConnectionMap = new Map<string, Connection>();

    public registerConnection(connection: Connection){
        this.inMemConnectionMap.set(connection.connectionId, connection)
    }
}