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

## Run Kube Cluster locally
1. Install kind
1. `kind create cluster`
1. Apply all kubernetes yml: `kubectl apply -f ./kubernetes`
1. Load all necessary images into cluster
1. `kubectl port-forward service/example-service 8080:80`
1. Go to `localhost:3000` in the browser

### Load New Image Into the Cluster
1. `docker build -t <imageName> .`
1. `kind load docker-image <imageName>`
1. `kubectl rollout restart deployment <deployment-name-here>`

## Kubectl commands
- Get logs for all pods in a deployment: `kubectl logs -f -l app=<app-name-here>`
    - This will need to be re-run if there is a deployment.
