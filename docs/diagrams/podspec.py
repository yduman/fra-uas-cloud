from diagrams import Diagram
from diagrams.k8s.clusterconfig import HPA
from diagrams.k8s.compute import Deployment, Pod, ReplicaSet
from diagrams.k8s.network import Ingress, Service

with Diagram("Kubernetes Pods", show=False):
    net = Ingress("shopping.dev") >> Service("Service")
    net >> [Pod("products-1"),
            Pod("products-2"),
            Pod("products-3")] << ReplicaSet("ReplicaSet") << Deployment("Deployment") << HPA("Horizontal Pod Autoscaler")
