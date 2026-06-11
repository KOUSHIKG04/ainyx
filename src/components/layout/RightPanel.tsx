import { ChevronRight } from "lucide-react";

import { NodeInspector } from "@/components/inspector/NodeInspector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useApplications } from "@/hooks/use-app";
import { useUiStore } from "@/store/ui-store";
import type { RightPanelProps } from "@/types/components";

export function RightPanel({ nodes, setNodes }: RightPanelProps) {
  const applicationsQuery = useApplications();
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const isWorkspaceOpen = useUiStore((state) => state.isWorkspaceOpen);
  const isMobilePanelOpen = useUiStore((state) => state.isMobilePanelOpen);
  const setSelectedAppId = useUiStore((state) => state.setSelectedAppId);
  const setWorkspaceOpen = useUiStore((state) => state.setWorkspaceOpen);
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);

  function renderApplicationList(compact = false) {
    return (
      <section className="grid gap-2" aria-label="Applications">
        {applicationsQuery.isPending && (
          <>
            <div className="h-[54px] animate-pulse rounded-[10px] bg-slate-200 dark:bg-[#252b34]" />
            <div className="h-[54px] animate-pulse rounded-[10px] bg-slate-200 dark:bg-[#252b34]" />
            <div className="h-[54px] animate-pulse rounded-[10px] bg-slate-200 dark:bg-[#252b34]" />
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
                ? `grid h-auto w-full grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[10px] border border-indigo-300 bg-indigo-100 text-left hover:bg-indigo-200 dark:border-indigo-800 dark:bg-indigo-950/60 dark:hover:bg-indigo-950/80 ${
                    compact ? "px-2 py-1.5" : "p-2.5"
                  }`
                : `grid h-auto w-full grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[10px] border border-transparent text-left hover:bg-slate-100 dark:hover:bg-[#171a20] ${
                    compact ? "px-2 py-1.5" : "p-2.5"
                  }`
            }
            aria-current={selectedAppId === application.id ? "page" : undefined}
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
    );
  }

  return (
    <>
      <aside
        className={`fixed right-4 top-4 z-40 w-[320px] overflow-hidden rounded-xl border border-slate-300 bg-white/95 shadow-[0_16px_40px_rgb(15_23_42/18%)] backdrop-blur transition-[height] duration-200 dark:border-[#202630] dark:bg-[#0e1013]/95 dark:shadow-[0_16px_40px_rgb(0_0_0/45%)] max-[900px]:hidden ${
          isWorkspaceOpen ? "h-[calc(100vh-2rem)]" : "h-[66px]"
        }`}
      >
        <Accordion
          type="single"
          collapsible
          value={isWorkspaceOpen ? "workspace" : ""}
          onValueChange={(value) => {
            setWorkspaceOpen(value === "workspace");
          }}
          className="h-full"
        >
          <AccordionItem value="workspace" className="h-full border-0 px-4">
            <AccordionTrigger className="py-4 text-slate-950 hover:no-underline dark:text-slate-50">
              <span className="text-xs uppercase tracking-[0.08em] text-slate-500 dark:text-[#7f8a99]">
                Workspace
              </span>
            </AccordionTrigger>

            <AccordionContent className="h-[calc(100vh-82px)]! p-0">
              <ScrollArea className="-mx-4 h-full w-[calc(100%+2rem)]">
                <div className="px-4 pb-6 pr-6">
                  <h2 className="mb-3 text-xl font-semibold">Applications</h2>
                  {renderApplicationList(true)}

                  <NodeInspector
                    nodes={nodes}
                    setNodes={setNodes}
                    idPrefix="desktop"
                    compact
                  />
                </div>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>

      <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
        <SheetContent
          side="right"
          className="hidden w-[min(360px,88vw)] max-w-none gap-0 border-slate-300 bg-white p-0 text-slate-950 dark:border-[#202630] dark:bg-[#0e1013] dark:text-slate-50 max-[900px]:flex"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Application panel</SheetTitle>
            <SheetDescription>
              Select an application and edit the selected graph node.
            </SheetDescription>
          </SheetHeader>
          <div className="min-h-0 overflow-y-auto p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.08em] text-slate-500 dark:text-[#7f8a99]">
                  Workspace
                </span>
                <h2 className="mt-1 text-xl font-semibold">Applications</h2>
              </div>
            </div>

            <div className="mt-6">{renderApplicationList()}</div>

            <NodeInspector
              nodes={nodes}
              setNodes={setNodes}
              idPrefix="mobile"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
