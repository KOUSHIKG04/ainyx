import type { Edge, Node } from "@xyflow/react";

export type ServiceStatus = "healthy" | "degraded" | "down";

export type ServiceNodeData = {
  name: string;
  description: string;
  status: ServiceStatus;
  capacity: number;
};

export type ServiceNode = Node<ServiceNodeData, "service">;

export type AppGraph = {
  nodes: ServiceNode[];
  edges: Edge[];
};

export type Application = {
  id: string;
  name: string;
};
