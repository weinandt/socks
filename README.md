# socks
Infrastructure and patterns for a scalable web socket solution.

## Run Kube Cluster locally
1. Install kind
1. `kind create cluster`
1. Load all necessary images into cluster (see instructions for loading image into cluster)
1. Apply all kubernetes yml: `kubectl apply -f ./kubernetes`
1. `kubectl port-forward service/local-load-balancer 8080:8080`
1. Go to `localhost:8080` in the browser

### Load New Image Into the Cluster
1. `./localDeploy.sh`

## Kubectl commands
- Get logs for all pods in a deployment: `kubectl logs -f -l app=<app-name-here>`
    - This will need to be re-run if there is a deployment.

## Next work
1. Create e2e test.
1. Clients disconnecting should register.


## TODO
1. Have websocket container find it's ip address.
1. Use helm
1. Add auth to websocket server
1. Run a logging container in each pod. Logs should be accessable in the browser.
    - Make sure the log rotation is configured.
1. Make local kind cluster multi-node