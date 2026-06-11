import type {
  Edge,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import type { Dispatch, SetStateAction, SVGProps } from "react";

import type { GraphNode } from "@/types/graph";

export type GraphCanvasProps = {
  nodes: GraphNode[];
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange<GraphNode>;
  onEdgesChange: OnEdgesChange<Edge>;
};

export type NodeInspectorProps = {
  nodes: GraphNode[];
  setNodes: Dispatch<SetStateAction<GraphNode[]>>;
  idPrefix?: string;
  compact?: boolean;
};

export type RightPanelProps = {
  nodes: GraphNode[];
  setNodes: Dispatch<SetStateAction<GraphNode[]>>;
};

export type TopBarProps = {
  onAddNode: () => void;
};

export type ShortcutOptions = {
  reactFlow: ReactFlowInstance;
  togglePanel: () => void;
};

export type GithubIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type MetricProps = {
  label: string;
  value: string;
  icon?: LucideIcon;
};
