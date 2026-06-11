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
  idPrefix?: string;
};

const statusLabels = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
} as const;

const statusBadgeStyles = {
  healthy: "border-green-800 text-green-400",
  degraded: "border-yellow-800 text-yellow-300",
  down: "border-red-800 text-red-400",
} as const;

export function NodeInspector({
  nodes,
  setNodes,
  idPrefix = "inspector",
}: NodeInspectorProps) {
  const selectedNodeId = useUiStore((state) => state.selectedNodeId);

  const activeTab = useUiStore((state) => state.activeInspectorTab);

  const setActiveTab = useUiStore((state) => state.setActiveInspectorTab);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const nameInputId = `${idPrefix}-node-name`;
  const descriptionInputId = `${idPrefix}-node-description`;
  const capacityInputId = `${idPrefix}-node-capacity`;

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
    const roundedValue = Math.round(value);
    const safeValue = Math.min(100, Math.max(0, roundedValue));
    updateSelectedNode({
      capacity: safeValue,
    });
  }

  if (!selectedNode) {
    return (
      <section className="mt-7 border-t border-[#252b34] pt-[22px] text-center text-slate-400">
        <Settings2 size={24} />

        <h3 className="mb-1 mt-3 font-semibold text-slate-50">
          No node selected
        </h3>

        <p className="text-[13px]">
          Select a service node on the canvas to edit it.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-7 border-t border-[#252b34] pt-[22px]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.08em] text-[#7f8a99]">
            Service Node
          </span>
          <h3 className="mt-1 font-semibold">{selectedNode.data.name}</h3>
        </div>

        <Badge
          variant="outline"
          className={statusBadgeStyles[selectedNode.data.status]}
          aria-label={`Node status: ${statusLabels[selectedNode.data.status]}`}
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
        <TabsList className="my-5 grid w-full grid-cols-2">
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
          <div className="mb-[18px] grid gap-2">
            <label className="text-[13px] text-slate-300" htmlFor={nameInputId}>
              Node name
            </label>

            <Input
              id={nameInputId}
              className="border-[#29313d] bg-[#171a1f] text-slate-50"
              value={selectedNode.data.name}
              onChange={(event) => {
                updateSelectedNode({
                  name: event.target.value,
                });
              }}
            />
          </div>

          <div className="mb-[18px] grid gap-2">
            <label
              className="text-[13px] text-slate-300"
              htmlFor={descriptionInputId}
            >
              Description
            </label>

            <Textarea
              id={descriptionInputId}
              className="border-[#29313d] bg-[#171a1f] text-slate-50"
              value={selectedNode.data.description}
              onChange={(event) => {
                updateSelectedNode({
                  description: event.target.value,
                });
              }}
            />
          </div>

          <div className="mb-[18px] grid gap-2">
            <div className="flex items-center justify-between">
              <label
                className="text-[13px] text-slate-300"
                htmlFor={capacityInputId}
              >
                CPU capacity
              </label>

              <span>{selectedNode.data.capacity}%</span>
            </div>

            <div className="flex items-center gap-3">
              <Slider
                aria-label="CPU capacity"
                value={[selectedNode.data.capacity]}
                min={0}
                max={100}
                step={1}
                onValueChange={([value]) => {
                  updateCapacity(value ?? 0);
                }}
              />

              <Input
                id={capacityInputId}
                type="number"
                min={0}
                max={100}
                value={selectedNode.data.capacity}
                className="w-[72px] border-[#29313d] bg-[#171a1f] text-slate-50"
                onChange={(event) => {
                  const value = event.target.valueAsNumber;

                  if (!Number.isNaN(value)) {
                    updateCapacity(value);
                  }
                }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime">
          <div className="rounded-[10px] border border-[#29313d] bg-[#171a1f] p-4">
            <span className="block">Current allocation</span>
            <strong className="mt-2 block text-[26px]">
              {selectedNode.data.capacity}%
            </strong>
            <p className="text-[13px] text-slate-400">
              Runtime information is mocked for this assignment.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
