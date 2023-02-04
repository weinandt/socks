# Websocket Server

## To Run Locally
1. `npm install`
1. Start the server: `npm run start`
1. Start a client: `npm run call-local`
1. Send a message from the cli and see the server print it.

### Run tests
1. `npm run test`

### Debugging server and test
1. Open VSCode workspace in the `websocket-server` directory.
1. Go to debug tab and select either the test or server debug drop down.

### Run in docker
1. `docker build -t test .`
1. `docker run -p 8080:8080 test`