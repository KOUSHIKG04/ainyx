import { ChevronRight, X } from "lucide-react";
import { useUiStore } from "@/store/ui-store";
import type { Dispatch, SetStateAction } from "react";
import { NodeInspector } from "@/components/inspector/NodeInspector";
import type { ServiceNode } from "@/types/graph";

type RightPanelProps = {
  nodes: ServiceNode[];
  setNodes: Dispatch<SetStateAction<ServiceNode[]>>;
};

const applications = [
  { id: "app-1", name: "supertokens-golang" },
  { id: "app-2", name: "supertokens-java" },
  { id: "app-3", name: "supertokens-python" },
  { id: "app-4", name: "supertokens-ruby" },
];

export function RightPanel({ nodes, setNodes }: RightPanelProps) {
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const selectedNodeId = useUiStore((state) => state.selectedNodeId);
  const isMobilePanelOpen = useUiStore((state) => state.isMobilePanelOpen);

  const setSelectedAppId = useUiStore((state) => state.setSelectedAppId);

  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);

  return (
    <>
      <NodeInspector nodes={nodes} setNodes={setNodes} />
    </>
  );
}
