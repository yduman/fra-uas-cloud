# Self-managed Kubernetes on GCP

This is a monorepo containing all the services and configurations needed for running a fictional PoC online-shop on the cloud by bootstrapping a self-managed Kubernetes cluster on the Google Cloud Platform.

## Ingress-NGINX Setup

- https://kubernetes.github.io/ingress-nginx/deploy/

```console
# Docker Desktop Cluster
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml
$ kubectl get pods --namespace=ingress-nginx
```

### ⚠️ Modify Hosts File

- On macOS/Linux
  - `/etc/hosts`
- On Windows
  - `C:\Windows\System32\Drivers\etc\hosts`
- Add `127.0.0.1 shopping.dev`

## Services

| Service | Port | Language   | DB      | Port  |
| ------- | ---- | ---------- | ------- | ----- |
| `auth`  | 3001 | TypeScript | MongoDB | 27017 |
