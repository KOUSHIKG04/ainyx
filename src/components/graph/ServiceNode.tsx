import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Database, Server } from "lucide-react";
import type { ServiceNode as ServiceNodeType } from "@/types/graph";

const statusStyles = {
  healthy: {
    label: "Healthy",
    className: "service-node__status--healthy",
  },
  degraded: {
    label: "Degraded",
    className: "service-node__status--degraded",
  },
  down: {
    label: "Down",
    className: "service-node__status--down",
  },
} as const;

export function ServiceNode({ data, selected }: NodeProps<ServiceNodeType>) {
    
  const status = statusStyles[data.status];

  return (
    <article
      className={`service-node ${selected ? "service-node--selected" : ""}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="service-node__handle"
      />

      <header className="service-node__header">
        <div className="service-node__title">
          <span className="service-node__icon">
            <Database size={18} />
          </span>

          <strong>{data.name}</strong>
        </div>

        <button
          type="button"
          className="service-node__settings nodrag"
          aria-label={`Open settings for ${data.name}`}
        >
          <Server size={17} />
        </button>
      </header>

      <p
        className="service-
        node__description"
      >
        {data.description}
      </p>

      <div className="service-node__metrics">
        <div>
          <span>CPU</span>
          <strong>{data.capacity}%</strong>
        </div>

        <div>
          <span>Memory</span>
          <strong>0.05 GB</strong>
        </div>

        <div>
          <span>Disk</span>
          <strong>10 GB</strong>
        </div>
      </div>

      <div className="service-node__progress">
        <span style={{ width: `${data.capacity}%` }} />
      </div>

      <footer className="service-node__footer">
        <span
          className={`service-node__status
          ${status.className}`}
        >
          {status.label}
        </span>

        <span className="service-node__provider">AWS</span>
      </footer>

      <Handle
        type="source"
        position={Position.Right}
        className="service-node__handle"
      />
    </article>
  );
}
