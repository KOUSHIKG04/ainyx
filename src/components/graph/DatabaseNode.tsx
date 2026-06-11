import { Database, HardDrive } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import type { DatabaseGraphNode } from "@/types/graph";
import type { MetricProps } from "@/types/components";

const statusStyles = {
  healthy: { label: "Healthy", className: "bg-green-500/20 text-green-500" },
  degraded: {
    label: "Degraded",
    className: "bg-yellow-400/20 text-yellow-500",
  },
  down: { label: "Down", className: "bg-red-500/20 text-red-500" },
} as const;

function Metric({
  label,
  value,
  icon: Icon,
}: MetricProps) {
  return (
    <div className="grid gap-1">
      <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
        {Icon && <Icon size={11} />}
        {label}
      </span>
      <strong className="text-xs">{value}</strong>
    </div>
  );
}

export function DatabaseNode({
  data,
  selected,
}: NodeProps<DatabaseGraphNode>) {
  const status = statusStyles[data.status];

  return (
    <article
      className={`relative w-[340px] rounded-[18px] border bg-emerald-50 p-5 text-slate-950 shadow-[0_14px_35px_rgb(15_23_42/16%)] dark:bg-[#03110c] dark:text-slate-50 dark:shadow-[0_14px_35px_rgb(0_0_0/35%)] max-[560px]:w-[280px] ${
        selected
          ? "border-emerald-500 ring-2 ring-emerald-500/25"
          : "border-emerald-200 dark:border-emerald-950"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="size-2.5! border-2! border-white! bg-emerald-500! dark:border-slate-900!"
      />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid size-[34px] place-items-center rounded-[9px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <Database size={18} />
          </span>
          <div>
            <strong className="block">{data.name}</strong>
            <span className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Database
            </span>
          </div>
        </div>

        <span className="grid size-[34px] place-items-center rounded-[9px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          <HardDrive size={17} />
        </span>
      </header>

      <p className="my-4 text-[13px] text-slate-500 dark:text-slate-400">
        {data.description}
      </p>

      <div className="grid grid-cols-3 gap-2">
        <Metric label="Capacity" value={`${data.capacity}%`} />
        <Metric label="Memory" value="0.05 GB" />
        <Metric label="Storage" value="10 GB" icon={HardDrive} />
      </div>

      <div className="my-[18px] h-[7px] overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950">
        <span
          className="block h-full rounded-[inherit] bg-linear-to-r from-emerald-500 to-teal-400"
          style={{ width: `${data.capacity}%` }}
        />
      </div>

      <footer className="flex items-center justify-between">
        <span
          className={`rounded-md px-2.5 py-1.5 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Storage
        </span>
      </footer>

      <Handle
        type="source"
        position={Position.Right}
        className="size-2.5! border-2! border-white! bg-emerald-500! dark:border-slate-900!"
      />
    </article>
  );
}
