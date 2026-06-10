import { useEffect } from "react";
import { useEdgesState, useNodesState, type Edge } from "@xyflow/react";
import { GraphCanvas } from "./components/graph/GraphCanvas";
import { LeftRail } from "./components/layout/LeftRail";
import { RightPanel } from "./components/layout/RightPanel";
import { TopBar } from "./components/layout/TopBar";
import { useApplicationGraph } from "./hooks/use-app-graph";
import { useUiStore } from "./store/ui-store";
import type { ServiceNode } from "./types/graph";

function App() {
  const selectedAppId = useUiStore((state) => state.selectedAppId);

  const setSelectedNodeId = useUiStore((state) => state.setSelectedNodeId);

  const graphQuery = useApplicationGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNode>([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (!graphQuery.data) {
      return;
    }

    setNodes(graphQuery.data.nodes);
    setEdges(graphQuery.data.edges);
    setSelectedNodeId(null);
  }, [graphQuery.data, setEdges, setNodes, setSelectedNodeId]);

  return (
    <div className="app-shell">
      <TopBar />

      <div className="app-shell__body">
        <LeftRail />

        <main className="canvas-area">
          {graphQuery.isPending && (
            <div className="canvas-message">
              <div className="loading-spinner" />
              <p>Loading application graph...</p>
            </div>
          )}

          {graphQuery.isError && (
            <div
              className="canvas-message canvas-message--error"
            >
              <h2>Unable to load graph</h2>
              <p>{graphQuery.error.message}</p>

              <button type="button" onClick={() => graphQuery.refetch()}>
                Try again
              </button>
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

        <RightPanel />
      </div>
    </div>
  );
}

export default App;
