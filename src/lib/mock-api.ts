import type { AppGraph, Application } from "@/types/graph";

type ApiError = {
  message?: string;
};

async function readJson<T>(
  response: Response,
  fallbackMessage: string,
): Promise<T> {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error(
      `${fallbackMessage} The mock API did not return JSON. Reload the page to reactivate MSW.`,
    );
  }

  const body = (await response.json()) as T | ApiError;

  if (!response.ok) {
    const error = body as ApiError;
    throw new Error(error.message ?? fallbackMessage);
  }

  return body as T;
}

export async function getApplications(): Promise<Application[]> {
  const response = await fetch("/apps");
  return readJson<Application[]>(response, "Failed to load applications.");
}

export async function getApplicationGraph(appId: string): Promise<AppGraph> {
  const response = await fetch(`/apps/${encodeURIComponent(appId)}/graph`);
  return readJson<AppGraph>(response, "Failed to load the application graph.");
}
