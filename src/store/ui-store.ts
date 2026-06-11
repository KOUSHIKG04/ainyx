import { create } from "zustand";

type InspectorTab = "config" | "runtime";
export type Theme = "light" | "dark";

const storedTheme = localStorage.getItem("app-graph-theme");
const initialTheme: Theme = storedTheme === "light" ? "light" : "dark";

type UiState = {
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

export const useUiStore = create<UiState>((set) => ({
  selectedAppId: "app-1",
  selectedNodeId: null,
  isWorkspaceOpen: true,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",
  theme: initialTheme,

  setSelectedAppId: (selectedAppId) => {
    set({
      selectedAppId,
      selectedNodeId: null,
    });
  },

  setSelectedNodeId: (selectedNodeId) => {
    set({ selectedNodeId });
  },

  setWorkspaceOpen: (isWorkspaceOpen) => {
    set({ isWorkspaceOpen });
  },

  setMobilePanelOpen: (isMobilePanelOpen) => {
    set({ isMobilePanelOpen });
  },

  setActiveInspectorTab: (activeInspectorTab) => {
    set({ activeInspectorTab });
  },

  toggleTheme: () => {
    set((state) => {
      const theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("app-graph-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
      return { theme };
    });
  },
}));
