import { create } from "zustand";

type InspectorTab = "config" | "runtime";

type UiState = {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  setSelectedAppId: (appId: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (isOpen: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
};

export const useUiStore = create<UiState>((set) => ({
  selectedAppId: "app-1",
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",

  setSelectedAppId: (selectedAppId) => {
    set({
      selectedAppId,
      selectedNodeId: null,
    });
  },

  setSelectedNodeId: (selectedNodeId) => {
    set({ selectedNodeId });
  },

  setMobilePanelOpen: (isMobilePanelOpen) => {
    set({ isMobilePanelOpen });
  },

  setActiveInspectorTab: (activeInspectorTab) => {
    set({ activeInspectorTab });
  },
}));
