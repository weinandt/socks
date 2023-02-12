import { Connection } from "./connection";
import { Message } from "./message";

// TODO: should probably have a shared http agent.
export class WebsocketServerGateway {
    private websocketServerPort: number

    constructor(websocketServerPort: number) {
        this.websocketServerPort = websocketServerPort
    }

    public async sendMessage(message: Message, connection: Connection) {
        const url = `http://${connection.websocketServerIp}:${this.websocketServerPort}/message`
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
            
                  body: JSON.stringify(message)
            })
        }
        catch(err: any) {
            console.log("Problem sending message.")
        }
    }
}