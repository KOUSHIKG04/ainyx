import type { ServiceNode } from "@/types/graph";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";
import { ServiceNode as ServiceNodeComponent } from "./ServiceNode";

const initialNodes: ServiceNode[] = [
  {
    id: "postgres",
    type: "service",
    position: { x: 100, y: 100 },
    data: {
      name: "Postgres",
      description: "Primary database",
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

const initialEdges: Edge[] = [
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

const nodeTypes = {
  service: ServiceNodeComponent,
};

export function GraphCanvas() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<ServiceNode>(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  //   const nodeTypes = useMemo(
  //     () => ({
  //       service: ServiceNodeComponent,
  //     }),
  //     [],
  //   );

  return (
    <div className="h-full w-full">
      <ReactFlow<ServiceNode, Edge>
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={(deletedNodes) => {
          const deletedIds = new Set(deletedNodes.map((node) => node.id));

          setEdges((currentEdges) =>
            currentEdges.filter(
              (edge) =>
                !deletedIds.has(edge.source) && !deletedIds.has(edge.target),
            ),
          );
        }}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#334155"
        />

        <Controls />
      </ReactFlow>
    </div>
  );
}
