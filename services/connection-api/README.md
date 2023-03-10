# Websocket Server

## To Run Locally
1. `npm install`
1. Start the server: `npm run start`
1. In a browser: `http://localhost:3000/graphql`
1. Use the following query:
````graphql
mutation {
  registerConnection(input: {id: "guidhere", tenantId: "fakeTenantGuidHere", holdingServer: {ipAddress: "10.0.0.1" id:"serverGuid"}}) {
    id
    tenantId
    holdingServer {
      id
      ipAddress
    }
  }
}
````

### Optional: Run in docker container:
1. `docker build -t myimagename`
1. `docker run -p 3000:3000 myimagename`

### Run tests
1. `npm run test`

### Debugging server and test
1. Open VSCode workspace in the `connection-api` directory.
1. Go to debug tab and select either the test or server debug drop down.
