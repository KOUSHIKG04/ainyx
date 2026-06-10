import type { Edge } from "@xyflow/react";
import type { ServiceNode } from "@/types/graph";

export const initialNodes: ServiceNode[] = [
  {
    id: "postgres",
    type: "service",
    position: { x: 100, y: 100 },
    data: {
      name: "Postgres",
      description: "Primary relational database",
      status: "healthy",
      capacity: 40,
    },
  },
  {
    id: "redis",
    type: "service",
    position: { x: 500, y: 300 },
    data: {
      name: "Redis",
      description: "Application cache",
      status: "degraded",
      capacity: 65,
    },
  },
  {
    id: "mongodb",
    type: "service",
    position: { x: 900, y: 120 },
    data: {
      name: "MongoDB",
      description: "Document storage",
      status: "down",
      capacity: 80,
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "postgres-redis",
    source: "postgres",
    target: "redis",
  },
  {
    id: "redis-mongodb",
    source: "redis",
    target: "mongodb",
  },
];
