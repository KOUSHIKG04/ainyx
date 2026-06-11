import type { Edge, Node } from "@xyflow/react";

export type ServiceStatus = "healthy" | "degraded" | "down";

/** Shared editable data rendered by service and database graph nodes. */
export type GraphNodeData = {
  name: string;
  description: string;
  status: ServiceStatus;
  /**
   * Integer percentage from 0 to 100. Writers must clamp and round
   * out-of-range or fractional input before storing it.
   */
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
