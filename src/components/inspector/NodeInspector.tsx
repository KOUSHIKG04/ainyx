import type { Dispatch, SetStateAction } from "react";
import { Activity, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUiStore } from "@/store/ui-store";
import type { ServiceNode, ServiceNodeData } from "@/types/graph";

type NodeInspectorProps = {
  nodes: ServiceNode[];
  setNodes: Dispatch<SetStateAction<ServiceNode[]>>;
};

const statusLabels = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
} as const;

export function NodeInspector({ nodes, setNodes }: NodeInspectorProps) {
  const selectedNodeId = useUiStore((state) => state.selectedNodeId);

  const activeTab = useUiStore((state) => state.activeInspectorTab);

  const setActiveTab = useUiStore((state) => state.setActiveInspectorTab);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  function updateSelectedNode(changes: Partial<ServiceNodeData>) {
    if (!selectedNodeId) {
      return;
    }

    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...changes,
              },
            }
          : node,
      ),
    );
  }

  function updateCapacity(value: number) {
    const safeValue = Math.min(100, Math.max(0, value));

    updateSelectedNode({
      capacity: safeValue,
    });
  }

  if (!selectedNode) {
    return (
      <section className="empty-inspector">
        <Settings2 size={24} />

        <h3>No node selected</h3>

        <p>Select a service node on the canvas to edit it.</p>
      </section>
    );
  }

  return (
    <section className="node-inspector">
      <div className="node-inspector__title">
        <div>
          <span>Service Node</span>
          <h3>{selectedNode.data.name}</h3>
        </div>

        <Badge
          variant="outline"
          className={`status-badge status-
            badge--${selectedNode.data.status}`}
        >
          {statusLabels[selectedNode.data.status]}
        </Badge>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (value === "config" || value === "runtime") {
            setActiveTab(value);
          }
        }}
      >
        <TabsList className="inspector-tabs">
          <TabsTrigger value="config">
            <Settings2 size={15} />
            Config
          </TabsTrigger>

          <TabsTrigger value="runtime">
            <Activity size={15} />
            Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <div className="inspector-field">
            <label htmlFor="node-name">Node name</label>

            <Input
              id="node-name"
              value={selectedNode.data.name}
              onChange={(event) => {
                updateSelectedNode({
                  name: event.target.value,
                });
              }}
            />
          </div>

          <div className="inspector-field">
            <label htmlFor="node-description">Description</label>

            <Textarea
              id="node-description"
              value={selectedNode.data.description}
              onChange={(event) => {
                updateSelectedNode({
                  description: event.target.value,
                });
              }}
            />
          </div>

          <div className="inspector-field">
            <div className="capacity-label">
              <label htmlFor="node-capacity">CPU capacity</label>

              <span>{selectedNode.data.capacity}%</span>
            </div>

            <div className="capacity-control">
              <Slider
                value={[selectedNode.data.capacity]}
                min={0}
                max={100}
                step={1}
                onValueChange={([value]) => {
                  updateCapacity(value ?? 0);
                }}
              />

              <Input
                id="node-capacity"
                type="number"
                min={0}
                max={100}
                value={selectedNode.data.capacity}
                onChange={(event) => {
                  updateCapacity(Number(event.target.value));
                }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime">
          <div className="runtime-card">
            <span>Current allocation</span>
            <strong>{selectedNode.data.capacity}%</strong>
            <p>Runtime information is mocked for this assignment.</p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
