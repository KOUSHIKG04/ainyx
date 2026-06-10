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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ServiceNode as ServiceNodeComponent } from "@/components/graph/ServiceNode";
import { useUiStore } from "@/store/ui-store";
import "@xyflow/react/dist/style.css";
import type { ServiceNode as ServiceNodeType } from "@/types/graph";

const nodeTypes = {
  service: ServiceNodeComponent,
};

type GraphCanvasProps = {
  nodes: ServiceNodeType[];
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange<ServiceNodeType>;
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

  function handleNodesDelete(deletedNodes: ServiceNodeType[]) {
    const deletedIds = new Set(deletedNodes.map((node) => node.id));

    setEdges((currentEdges) =>
      currentEdges.filter(
        (edge) => !deletedIds.has(edge.source) && !deletedIds.has(edge.target),
      ),
    );

    setSelectedNodeId(null);
  }

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
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
        }}
        onPaneClick={() => {
          setSelectedNodeId(null);
        }}
        onNodesDelete={handleNodesDelete}
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
