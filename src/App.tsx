import { useEffect } from "react";
import {
  useEdgesState,
  useNodesState,
  type Edge,
  ReactFlowProvider,
} from "@xyflow/react";
import { GraphCanvas } from "./components/graph/GraphCanvas";
import { LeftRail } from "./components/layout/LeftRail";
import { RightPanel } from "./components/layout/RightPanel";
import { TopBar } from "./components/layout/TopBar";
import { useApplicationGraph } from "./hooks/use-app-graph";
import { useUiStore } from "./store/ui-store";
import type { GraphNode } from "./types/graph";
import { Button } from "./components/ui/button";

function AppContent() {
  const selectedAppId = useUiStore((state) => state.selectedAppId);

  const setSelectedNodeId = useUiStore((state) => state.setSelectedNodeId);

  const graphQuery = useApplicationGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState<GraphNode>([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
  }, [selectedAppId, setEdges, setNodes, setSelectedNodeId]);

  useEffect(() => {
    if (!graphQuery.data) {
      return;
    }

    setNodes(structuredClone(graphQuery.data.nodes));
    setEdges(structuredClone(graphQuery.data.edges));
    setSelectedNodeId(graphQuery.data.nodes[0]?.id ?? null);
  }, [graphQuery.data, setEdges, setNodes, setSelectedNodeId]);

  function addNode() {
    const nodeId = crypto.randomUUID();
    const nodeNumber = nodes.length + 1;

    const newNode: GraphNode = {
      id: nodeId,
      type: "service",
      position: {
        x: 120 + (nodes.length % 3) * 380,
        y: 120 + Math.floor(nodes.length / 3) * 280,
      },
      data: {
        name: `Service ${nodeNumber}`,
        description: "Newly created service node",
        status: "healthy",
        capacity: 50,
      },
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
    setSelectedNodeId(nodeId);
  }

  return (
    <div className="relative h-full w-full bg-slate-100 text-slate-950 dark:bg-[#090b0d] dark:text-slate-50">
      <TopBar onAddNode={addNode} />

      <div className="relative h-full min-h-0">
        <LeftRail />

        <main className="relative h-full min-h-0 w-full min-w-0">
          {graphQuery.isPending && (
            <div className="grid h-full w-full place-content-center justify-items-center text-center text-slate-500 dark:text-slate-400">
              <div className="size-8 animate-spin rounded-full border-[3px] border-slate-300 border-t-indigo-500 dark:border-[#29313d] dark:border-t-indigo-500" />
              <p>Loading application graph...</p>
            </div>
          )}

          {graphQuery.isError && (
            <div className="grid h-full w-full place-content-center justify-items-center gap-3 text-center text-slate-500 dark:text-slate-400">
              <h2 className="text-xl font-semibold text-red-400">
                Unable to load graph
              </h2>
              <p>{graphQuery.error.message}</p>

              <Button
                type="button"
                variant="outline"
                onClick={() => graphQuery.refetch()}
              >
                Try again
              </Button>
            </div>
          )}

          {graphQuery.isSuccess && (
            <GraphCanvas
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
            />
          )}
        </main>

        <RightPanel nodes={nodes} setNodes={setNodes} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}

export default App;
