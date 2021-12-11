# Self-managed Kubernetes on GCP

This is a monorepo containing all the services and configurations needed for running a fictional PoC online-shop on the cloud by bootstrapping a self-managed Kubernetes cluster on the Google Cloud Platform.

## macOS Setup

- Install Docker for Desktop
- Enable the Kubernetes flag

## Linux Setup

### Install `minikube`

```console
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

### Install `kubectl`

```console
$ curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
$ curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
$ echo "$(<kubectl.sha256) kubectl" | sha256sum --check
$ sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
$ kubectl version --client
```

### Install `skaffold`

```console
$ curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
sudo install skaffold /usr/local/bin/
```

## Ingress-NGINX Setup

- https://kubernetes.github.io/ingress-nginx/deploy/

```console
# Docker Desktop Cluster
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml
$ kubectl get pods --namespace=ingress-nginx
```

### ⚠️ Modify Hosts File

For `minikube`, you need to retrieve the IP via `$ minikube ip` and also make sure to enable Ingress via `$ minikube addons enable ingress`  

- On macOS/Linux
  - `/etc/hosts`
- On Windows
  - `C:\Windows\System32\Drivers\etc\hosts`
- Add `127.0.0.1 shopping.dev`

## Services

| Service  | Port | Tech               | DB      | DB Port | Image         |
| -------- | ---- | ------------------ | ------- | ------- | ------------- |
| `client` | 3000 | JavaScript/Next.js | -       | -       | yduman/client |
| `auth`   | 3001 | TypeScript/Express | MongoDB | 27017   | yduman/auth   |

## Local Development

> Currently only tested on macOS via Docker Desktop

For local development you need to install the Skaffold CLI on your machine and run `skaffold dev` in order to spin up a local Kubernetes cluster.
