import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { GraphNode } from "@/types/graph";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useReactFlow,
  type Edge,
  type OnEdgesChange,
  type OnNodesChange,
  type Connection,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ServiceNode as ServiceNodeComponent } from "@/components/graph/ServiceNode";
import { DatabaseNode } from "@/components/graph/DatabaseNode";
import { useUiStore } from "@/store/ui-store";

const nodeTypes = {
  service: ServiceNodeComponent,
  database: DatabaseNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    stroke: "#6366f1",
    strokeWidth: 2,
  },
};

type GraphCanvasProps = {
  nodes: GraphNode[];
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange<GraphNode>;
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
  const setWorkspaceOpen = useUiStore((state) => state.setWorkspaceOpen);
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);
  const theme = useUiStore((state) => state.theme);
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (nodes.length === 0) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      void fitView({
        padding: 0.2,
        duration: 300,
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [fitView, nodes.length]);

  function handleNodesDelete(deletedNodes: GraphNode[]) {
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
      <ReactFlow<GraphNode, Edge>
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
          setWorkspaceOpen(true);

          if (window.matchMedia("(max-width: 900px)").matches) {
            setMobilePanelOpen(true);
          }
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
          color={theme === "dark" ? "#334155" : "#cbd5e1"}
        />

        <Controls position="bottom-right" />
      </ReactFlow>
    </div>
  );
}
