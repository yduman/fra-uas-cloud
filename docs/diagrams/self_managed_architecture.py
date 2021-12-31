from diagrams import Diagram, Cluster, Edge
from diagrams.k8s.infra import ETCD, Master, Node
from diagrams.k8s.controlplane import API, Kubelet, Scheduler, ControllerManager, KubeProxy

with Diagram("Self Managed Cluster with 3 Control Planes and 3 Nodes", show=False):
    with Cluster("Kubernetes Cluster"):
        master = Master("master-N")
        worker = Node("worker-N")
        with Cluster("Control Plane"):
            kube_api = API("Kube API Server")
            cp_components = [
                Scheduler("Scheduler"), ETCD("Persistence Storage"), ControllerManager("Controller Manager")]
            kube_api - cp_components
        with Cluster("Node"):
            worker_components = [Kubelet("Kubelet") - KubeProxy("Kube Proxy")]

    worker_components >> worker >> master >> kube_api
