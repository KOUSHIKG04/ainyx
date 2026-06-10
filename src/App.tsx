import { useEdgesState, useNodesState, type Edge } from "@xyflow/react";
import { GraphCanvas } from "./components/graph/GraphCanvas";
import { LeftRail } from "./components/layout/LeftRail";
import { RightPanel } from "./components/layout/RightPanel";
import { TopBar } from "./components/layout/TopBar";
import { initialEdges, initialNodes } from "@/data/initial-graph";
import type { ServiceNode } from "@/types/graph";

function App() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<ServiceNode>(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  return (
    <div className="app-shell">
      <TopBar />

      <div className="app-shell__body">
        <LeftRail />

        <main className="canvas-area">
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            setEdges={setEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
          />
        </main>

        <RightPanel nodes={nodes} setNodes={setNodes} />
      </div>
    </div>
  );
}

export default App;
