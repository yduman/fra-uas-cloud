from diagrams import Diagram, Cluster
from diagrams.programming.language import TypeScript, JavaScript
from diagrams.onprem.database import MongoDB
from diagrams.k8s.network import Ingress
from diagrams.onprem.client import User, Client

with Diagram("Microservice Architecture", show=False):
    load_balancer = Ingress("Load Balancer")
    with Cluster("Services"):
        with Cluster("Auth"):
            load_balancer >> TypeScript("auth") >> MongoDB("auth-db")
        with Cluster("Products"):
            load_balancer >> TypeScript("products") >> MongoDB("products-db")
        load_balancer >> JavaScript("client")

    User("Client") >> Client("Browser") >> load_balancer
