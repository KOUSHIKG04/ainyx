import type { Edge, Node } from "@xyflow/react";

export type ServiceStatus = "healthy" | "degraded" | "down";

export type GraphNodeData = {
  name: string;
  description: string;
  status: ServiceStatus;
  capacity: number;
};

export type ServiceGraphNode = Node<GraphNodeData, "service">;
export type DatabaseGraphNode = Node<GraphNodeData, "database">;
export type GraphNode = ServiceGraphNode | DatabaseGraphNode;

export type AppGraph = {
  nodes: GraphNode[];
  edges: Edge[];
};

export type Application = {
  id: string;
  name: string;
};
