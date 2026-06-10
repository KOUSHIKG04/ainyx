import { mockApplications, mockGraphs } from "@/data/mock-data";
import type { AppGraph, Application } from "@/types/graph";

let shouldSimulateError = false;

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export function setMockError(value: boolean): void {
  shouldSimulateError = value;
}

export async function getApplications(): Promise<Application[]> {
  await wait(700);

  if (shouldSimulateError) {
    throw new Error("Failed to load applications.");
  }

  return structuredClone(mockApplications);
}

export async function getApplicationGraph(appId: string): Promise<AppGraph> {
  await wait(900);

  if (shouldSimulateError) {
    throw new Error("Failed to load the application graph.");
  }

  const graph = mockGraphs[appId];

  if (!graph) {
    throw new Error(`Graph not found for application:
      ${appId}`);
  }

  return structuredClone(graph);
}
