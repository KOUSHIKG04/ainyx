import { useEffect } from "react";
import type { ShortcutOptions } from "@/types/components";

export function useKeyboardShortcuts({
  reactFlow,
  togglePanel,
}: ShortcutOptions) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key.toLowerCase() === "f") {
        void reactFlow.fitView({
          padding: 0.2,
          duration: 400,
        });
      }

      if (event.key.toLowerCase() === "p") {
        togglePanel();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [reactFlow, togglePanel]);
}
