import { Boxes, Database, GitBranch, Layers3, Server } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

const navigationItems = [
  { id: "github", label: "Source control", icon: GithubIcon },
  { id: "database", label: "Databases", icon: Database },
  { id: "services", label: "Services", icon: Server },
  { id: "layers", label: "Layers", icon: Layers3 },
  { id: "graph", label: "Graph", icon: GitBranch },
  { id: "apps", label: "Applications", icon: Boxes },
];

export function LeftRail() {
  return (
    <nav
      className="fixed left-3 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2 rounded-xl border border-slate-300 bg-white/95 p-1.5 shadow-[0_16px_40px_rgb(15_23_42/18%)] backdrop-blur dark:border-[#29313d] dark:bg-[#0e1013]/95 dark:shadow-[0_16px_40px_rgb(0_0_0/45%)] max-[560px]:hidden"
      aria-label="Main navigation"
    >
      {navigationItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            className={`grid size-[42px] cursor-pointer place-items-center rounded-[9px] border transition-colors ${
              index === 1
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-300 bg-white text-slate-500 hover:bg-slate-100 dark:border-[#29313d] dark:bg-[#171a1f] dark:text-slate-400 dark:hover:bg-[#252b34]"
            }`}
            aria-label={item.label}
            title={item.label}
          >
            <Icon size={20} />
          </button>
        );
      })}
    </nav>
  );
}
