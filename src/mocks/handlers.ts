import { delay, http, HttpResponse } from "msw";
import { mockApplications, mockGraphs } from "@/data/mock-data";
import { isMockErrorEnabled } from "@/mocks/scenario";

export const handlers = [
  http.get("*/apps", async () => {
    await delay(700);

    if (isMockErrorEnabled()) {
      return HttpResponse.json(
        { message: "Failed to load applications." },
        { status: 500 },
      );
    }

    return HttpResponse.json(mockApplications);
  }),

  http.get("*/apps/:appId/graph", async ({ params }) => {
    await delay(900);

    if (isMockErrorEnabled()) {
      return HttpResponse.json(
        { message: "Failed to load the application graph." },
        { status: 500 },
      );
    }

    const appId = String(params.appId);
    const graph = mockGraphs[appId];

    if (!graph) {
      return HttpResponse.json(
        { message: `Graph not found for application: ${appId}` },
        { status: 404 },
      );
    }

    return HttpResponse.json(graph);
  }),
];
