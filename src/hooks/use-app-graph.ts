import { useQuery } from "@tanstack/react-query";
import { getApplicationGraph } from "@/lib/mock-api";

export function useApplicationGraph(appId: string) {
  return useQuery({
    queryKey: ["application-graph", appId],
    queryFn: () => getApplicationGraph(appId),
    enabled: appId.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}
