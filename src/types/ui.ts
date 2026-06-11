export type InspectorTab = "config" | "runtime";
export type Theme = "light" | "dark";

export type UiState = {
  selectedAppId: string;
  selectedNodeId: string | null;
  isWorkspaceOpen: boolean;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  theme: Theme;
  setSelectedAppId: (appId: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setWorkspaceOpen: (isOpen: boolean) => void;
  setMobilePanelOpen: (isOpen: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  toggleTheme: () => void;
};
