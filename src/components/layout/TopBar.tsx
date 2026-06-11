import { useUiStore } from "@/store/ui-store";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Menu,
  Moon,
  Share2,
  Maximize2,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { setMockError } from "@/mocks/scenario";
import { useReactFlow } from "@xyflow/react";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { Button } from "@/components/ui/button";

type TopBarProps = {
  onAddNode: () => void;
};

const actionButtonClass =
  "border-[#29313d] bg-[#171a1f] text-slate-200 hover:bg-[#252b34] hover:text-white";

export function TopBar({ onAddNode }: TopBarProps) {
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);
  const isMobilePanelOpen = useUiStore((state) => state.isMobilePanelOpen);

  const queryClient = useQueryClient();
  const [isErrorEnabled, setIsErrorEnabled] = useState(false);
  const reactFlow = useReactFlow();

  async function toggleMockError() {
    const nextValue = !isErrorEnabled;

    setIsErrorEnabled(nextValue);
    setMockError(nextValue);

    await queryClient.resetQueries();
  }

  useKeyboardShortcuts({
    reactFlow,
    togglePanel: () => {
      setMobilePanelOpen(!isMobilePanelOpen);
    },
  });

  return (
    <header className="pointer-events-none absolute left-0 top-0 z-50 p-4 max-[560px]:p-3">
      <div className="flex items-center gap-2">
        <div className="pointer-events-auto rounded-xl border border-[#29313d] bg-[#101214]/90 p-1 shadow-[0_12px_32px_rgb(0_0_0/35%)] backdrop-blur">
          <div className="grid size-[38px] place-items-center rounded-[9px] bg-indigo-500 font-extrabold">
            A
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-1 rounded-xl border border-[#29313d] bg-[#101214]/90 p-1 shadow-[0_12px_32px_rgb(0_0_0/35%)] backdrop-blur">
          <Button
          type="button"
          variant="outline"
          size="icon"
          className={actionButtonClass}
          aria-label="Add service node"
          title="Add node"
          onClick={onAddNode}
        >
          <Plus size={18} />
          </Button>

          <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${actionButtonClass} max-[560px]:hidden`}
          aria-label="Share graph"
        >
          <Share2 size={18} />
          </Button>

          <Button
          type="button"
          variant="outline"
          size="icon"
          className={
            isErrorEnabled
              ? "border-red-800 bg-red-950/40 text-red-400 hover:bg-red-950/60 hover:text-red-300"
              : actionButtonClass
          }
          aria-label="Toggle mock API errors"
          title="Toggle mock API errors"
          onClick={toggleMockError}
        >
          <AlertTriangle size={18} />
          </Button>

          <Button
          type="button"
          variant="outline"
          size="icon"
          className={actionButtonClass}
          aria-label="Fit graph into view"
          title="Fit view"
          onClick={() => {
            void reactFlow.fitView({
              padding: 0.2,
              duration: 400,
            });
          }}
        >
          <Maximize2 size={18} />
          </Button>

          <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${actionButtonClass} max-[560px]:hidden`}
          aria-label="Change theme"
        >
          <Moon size={18} />
          </Button>

          <Button
          type="button"
          variant="outline"
          size="icon"
          className={`${actionButtonClass} hidden max-[900px]:inline-flex`}
          aria-label="Open application panel"
          onClick={() => setMobilePanelOpen(true)}
        >
          <Menu size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
