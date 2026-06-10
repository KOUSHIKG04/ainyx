import { useUiStore } from "@/store/ui-store";
import { Menu, Moon, Share2 } from "lucide-react";

export function TopBar() {
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);

  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <div className="top-bar__logo">A</div>

        <div>
          <strong>App Graph Builder</strong>
          <span>Infrastructure workspace</span>
        </div>
      </div>

      <div className="top-bar__actions">
        <button type="button" aria-label="Share graph">
          <Share2 size={18} />
        </button>

        <button type="button" aria-label="Change theme">
          <Moon size={18} />
        </button>

        <button
          type="button"
          className="top-bar__mobile-menu"
          aria-label="Open application panel"
          onClick={() => setMobilePanelOpen(true)}
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
