import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useClients(page = 1, search = "", status = ""): any {
  return useQuery({
    queryKey: ["clients", page, search, status],
    queryFn: async () => {
      const { data } = await api.get("/clients", {
        params: { page, search, status },
      });
      return data;
    },
  });
}
