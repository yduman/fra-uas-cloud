# Self-managed Kubernetes on GCP

This is a monorepo containing all the services and configurations needed for running a fictional PoC online-shop on the cloud by bootstrapping a self-managed Kubernetes cluster on the Google Cloud Platform.

## Services

| Name           | Port | Language/Tech |
| -------------- | ---- | ------------- |
| `frontend`     | 3000 | TypeScript    |
| `auth-service` | N/D  | TypeScript    |
| `users-db`     | N/D  | PostgreSQL    |

### `frontend`

#### Prerequisites

The steps below describe how you install Node.js and Yarn

- Visit [the Volta homepage](https://volta.sh/) and install it
- Run the following commands

```console
$ volta --version
$ volta install node
$ volta install yarn
```

#### Starting the UI locally

```console
$ cd frontend
$ yarn install # only needed once to install dependencies
$ yarn start
```
