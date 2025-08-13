import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function usePerformance(clientId: number) {
  return useQuery({
    queryKey: ["performance", clientId],
    queryFn: async () => {
        const { data } = await api.get(`/clients/${clientId}/performance`);
        return data;
    },
  });
}