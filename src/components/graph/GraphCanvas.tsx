import type { Dispatch, SetStateAction } from "react";
import type { ServiceNode } from "@/types/graph";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type Edge,
  type OnEdgesChange,
  type OnNodesChange,
  type Connection,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ServiceNode as ServiceNodeComponent } from "@/components/graph/ServiceNode";
import { useUiStore } from "@/store/ui-store";

const nodeTypes = {
  service: ServiceNodeComponent,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    stroke: "#6366f1",
    strokeWidth: 2,
  },
};

type GraphCanvasProps = {
  nodes: ServiceNode[];
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange<ServiceNode>;
  onEdgesChange: OnEdgesChange<Edge>;
};

export function GraphCanvas({
  nodes,
  edges,
  setEdges,
  onNodesChange,
  onEdgesChange,
}: GraphCanvasProps) {
  const setSelectedNodeId = useUiStore((state) => state.setSelectedNodeId);

  function handleNodesDelete(deletedNodes: ServiceNode[]) {
    const deletedIds = new Set(deletedNodes.map((node) => node.id));

    setEdges((currentEdges) =>
      currentEdges.filter(
        (edge) => !deletedIds.has(edge.source) && !deletedIds.has(edge.target),
      ),
    );

    setSelectedNodeId(null);
  }

  function handleConnect(connection: Connection) {
    setEdges((currentEdges) =>
      addEdge(
        {
          ...connection,
          animated: true,
          style: {
            stroke: "#6366f1",
            strokeWidth: 2,
          },
        },
        currentEdges,
      ),
    );
  }

  return (
    <div className="h-full w-full">
      <ReactFlow<ServiceNode, Edge>
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
        }}
        onPaneClick={() => {
          setSelectedNodeId(null);
        }}
        onNodesDelete={handleNodesDelete}
        deleteKeyCode={["Backspace", "Delete"]}
        onConnect={handleConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#334155"
        />

        <Controls position="bottom-right" />
      </ReactFlow>
    </div>
  );
}
