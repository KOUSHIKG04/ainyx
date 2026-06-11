import { create } from "zustand";
import type { Theme, UiState } from "@/types/ui";

const storedTheme = localStorage.getItem("app-graph-theme");
const initialTheme: Theme = storedTheme === "light" ? "light" : "dark";

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
