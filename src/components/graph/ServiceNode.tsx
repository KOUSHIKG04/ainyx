import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Database, Server } from "lucide-react";
import type { ServiceNode as ServiceNodeType } from "@/types/graph";

const statusStyles = {
  healthy: {
    label: "Healthy",
    className: "bg-green-500/20 text-green-400",
  },
  degraded: {
    label: "Degraded",
    className: "bg-yellow-400/20 text-yellow-300",
  },
  down: {
    label: "Down",
    className: "bg-red-500/20 text-red-400",
  },
} as const;

export function ServiceNode({ data, selected }: NodeProps<ServiceNodeType>) {
  const status = statusStyles[data.status];

  return (
    <article
      className={`relative w-[340px] rounded-[18px] border bg-[#030405] p-5 text-slate-50 shadow-[0_14px_35px_rgb(0_0_0/35%)] max-[560px]:w-[280px] ${
        selected
          ? "border-indigo-500 ring-2 ring-indigo-500/25"
          : "border-[#18202c]"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2.5 !border-2 !border-slate-900 !bg-indigo-500"
      />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-base">
          <span className="grid size-[34px] place-items-center rounded-[9px] bg-slate-50 text-blue-600">
            <Database size={18} />
          </span>

          <strong>{data.name}</strong>
        </div>

        <button
          type="button"
          className="nodrag grid size-[34px] cursor-pointer place-items-center rounded-[9px] border-0 bg-[#172033] text-slate-300 hover:bg-[#243047]"
          aria-label={`Open settings for ${data.name}`}
        >
          <Server size={17} />
        </button>
      </header>

      <p className="my-4 text-[13px] text-slate-400">{data.description}</p>

      <div className="grid grid-cols-3 gap-2">
        <div className="grid gap-1">
          <span className="text-[11px] text-slate-400">CPU</span>
          <strong className="text-xs">{data.capacity}%</strong>
        </div>

        <div className="grid gap-1">
          <span className="text-[11px] text-slate-400">Memory</span>
          <strong className="text-xs">0.05 GB</strong>
        </div>

        <div className="grid gap-1">
          <span className="text-[11px] text-slate-400">Disk</span>
          <strong className="text-xs">10 GB</strong>
        </div>
      </div>

      <div className="my-[18px] h-[7px] overflow-hidden rounded-full bg-slate-800">
        <span
          className="block h-full rounded-[inherit] bg-gradient-to-r from-blue-600 via-green-500 to-red-500"
          style={{ width: `${data.capacity}%` }}
        />
      </div>

      <footer className="flex items-center justify-between">
        <span
          className={`rounded-md px-2.5 py-1.5 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>

        <span className="text-xl font-bold text-amber-500">AWS</span>
      </footer>

      <Handle
        type="source"
        position={Position.Right}
        className="!size-2.5 !border-2 !border-slate-900 !bg-indigo-500"
      />
    </article>
  );
}
