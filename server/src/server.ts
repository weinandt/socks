export class Server {
    start(): boolean {
        console.log('started server')
        return true
    }
}

const server = new Server()
server.start()