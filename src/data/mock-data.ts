import type { Edge } from "@xyflow/react";
import type { Application, ServiceNode } from "@/types/graph";

export const mockApplications: Application[] = [
  { id: "app-1", name: "supertokens-golang" },
  { id: "app-2", name: "supertokens-java" },
  { id: "app-3", name: "supertokens-python" },
];

export const mockGraphs: Record<
  string,
  {
    nodes: ServiceNode[];
    edges: Edge[];
  }
> = {
  "app-1": {
    nodes: [
      {
        id: "postgres",
        type: "service",
        position: { x: 100, y: 80 },
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
        position: { x: 850, y: 100 },
        data: {
          name: "MongoDB",
          description: "Document storage",
          status: "down",
          capacity: 80,
        },
      },
    ],
    edges: [
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
    ],
  },

  "app-2": {
    nodes: [
      {
        id: "java-api",
        type: "service",
        position: { x: 150, y: 100 },
        data: {
          name: "Java API",
          description: "Spring Boot API",
          status: "healthy",
          capacity: 55,
        },
      },
      {
        id: "java-db",
        type: "service",
        position: { x: 600, y: 100 },
        data: {
          name: "Java Database",
          description: "Application database",
          status: "healthy",
          capacity: 35,
        },
      },
      {
        id: "java-cache",
        type: "service",
        position: { x: 380, y: 350 },
        data: {
          name: "Java Cache",
          description: "Shared cache",
          status: "degraded",
          capacity: 70,
        },
      },
    ],
    edges: [
      {
        id: "java-api-db",
        source: "java-api",
        target: "java-db",
      },
      {
        id: "java-api-cache",
        source: "java-api",
        target: "java-cache",
      },
    ],
  },

  "app-3": {
    nodes: [
      {
        id: "python-api",
        type: "service",
        position: { x: 100, y: 200 },
        data: {
          name: "Python API",
          description: "FastAPI service",
          status: "healthy",
          capacity: 45,
        },
      },
      {
        id: "worker",
        type: "service",
        position: { x: 500, y: 80 },
        data: {
          name: "Worker",
          description: "Background task worker",
          status: "healthy",
          capacity: 75,
        },
      },
      {
        id: "queue",
        type: "service",
        position: { x: 500, y: 350 },
        data: {
          name: "Task Queue",
          description: "Message queue",
          status: "down",
          capacity: 90,
        },
      },
    ],
    edges: [
      {
        id: "python-worker",
        source: "python-api",
        target: "worker",
      },
      {
        id: "python-queue",
        source: "python-api",
        target: "queue",
      },
    ],
  },
};
