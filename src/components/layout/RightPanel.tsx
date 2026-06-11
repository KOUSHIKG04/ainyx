import type { Dispatch, SetStateAction } from "react";
import { ChevronRight } from "lucide-react";

import { NodeInspector } from "@/components/inspector/NodeInspector";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useApplications } from "@/hooks/use-app";
import { useUiStore } from "@/store/ui-store";
import type { ServiceNode } from "@/types/graph";

type RightPanelProps = {
  nodes: ServiceNode[];
  setNodes: Dispatch<SetStateAction<ServiceNode[]>>;
};

export function RightPanel({ nodes, setNodes }: RightPanelProps) {
  const applicationsQuery = useApplications();
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const isMobilePanelOpen = useUiStore((state) => state.isMobilePanelOpen);
  const setSelectedAppId = useUiStore((state) => state.setSelectedAppId);
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);

  function renderPanelBody(idPrefix: string) {
    return (
      <>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.08em] text-[#7f8a99]">
              Workspace
            </span>
            <h2 className="mt-1 text-xl font-semibold">Applications</h2>
          </div>
        </div>

        <section className="mt-6 grid gap-2" aria-label="Applications">
          {applicationsQuery.isPending && (
            <>
              <div className="h-[54px] animate-pulse rounded-[10px] bg-[#252b34]" />
              <div className="h-[54px] animate-pulse rounded-[10px] bg-[#252b34]" />
              <div className="h-[54px] animate-pulse rounded-[10px] bg-[#252b34]" />
            </>
          )}

          {applicationsQuery.isError && (
            <div className="rounded-[10px] bg-red-950/30 p-3.5 text-red-400">
              <p>{applicationsQuery.error.message}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => applicationsQuery.refetch()}
              >
                Retry
              </Button>
            </div>
          )}

          {applicationsQuery.data?.map((application) => (
            <Button
              key={application.id}
              type="button"
              variant="ghost"
              className={
                selectedAppId === application.id
                  ? "grid h-auto w-full grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[10px] border border-indigo-800 bg-indigo-950/60 p-2.5 text-left hover:bg-indigo-950/80"
                  : "grid h-auto w-full grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[10px] border border-transparent p-2.5 text-left hover:bg-[#171a20]"
              }
              aria-current={
                selectedAppId === application.id ? "page" : undefined
              }
              onClick={() => {
                setSelectedAppId(application.id);
                setMobilePanelOpen(false);
              }}
            >
              <span className="grid size-[34px] place-items-center rounded-lg bg-indigo-500 font-bold text-white">
                {application.name.charAt(0).toUpperCase()}
              </span>
              <span>{application.name}</span>
              <ChevronRight size={17} />
            </Button>
          ))}
        </section>

        <NodeInspector nodes={nodes} setNodes={setNodes} idPrefix={idPrefix} />
      </>
    );
  }

  return (
    <>
      <aside className="z-30 overflow-y-auto border-l border-[#202630] bg-[#0e1013] p-5 max-[900px]:hidden">
        {renderPanelBody("desktop")}
      </aside>

      <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
        <SheetContent
          side="right"
          className="hidden w-[min(360px,88vw)] max-w-none gap-0 border-[#202630] bg-[#0e1013] p-0 text-slate-50 max-[900px]:flex"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Application panel</SheetTitle>
            <SheetDescription>
              Select an application and edit the selected graph node.
            </SheetDescription>
          </SheetHeader>
          <div className="min-h-0 overflow-y-auto p-5">
            {renderPanelBody("mobile")}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
