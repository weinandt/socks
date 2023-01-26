# socks
Infrastructure and patterns for a scalable web socket solution.


## Provision Infrastructure
1. `cd terraform`
1. `terraform init`
1. Fill out the `ohio.tfvars` file
1. `terraform apply -var-file="ohio.tfvars"`

## Run Server Locally
1. Have node installed
1. `cd server`
1. `npm install`
1. `npm run start`

### Running server tests
1. `npm run test`

### Debugging server and test
1. Open VSCode workspace in the `server` directory.
1. Go to debug tab and select either the test or server debug drop down.

### Run in docker
1. `cd server`
1. `docker build -t test .`
1. `docker run -p 8080:8080 test`