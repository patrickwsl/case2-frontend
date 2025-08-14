import { Allocation } from "@/app/allocations/interfaces";
import { api } from "@/lib/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";


async function getAllocations(
  isActive?: boolean,
  page = 1,
  limit = 10,
  clientId?: number | "",
  assetId?: number | ""
): Promise<Allocation[]> {
  const params: any = {
    page,
    limit,
  };
  if (isActive !== undefined) params.is_active = isActive;
  if (clientId) params.client_id = clientId;
  if (assetId) params.asset_id = assetId;

  const { data } = await api.get<Allocation[]>("/allocations", { params });
  return data;
}

function LoadAndGetAllocations(
  isActive?: boolean,
  page = 1,
  limit = 10,
  clientId?: number | "",
  assetId?: number | ""
): UseQueryResult<Allocation[], Error> {
  return useQuery<Allocation[], Error>({
    queryKey: ["allocations", page, limit, isActive, clientId, assetId],
    queryFn: () => getAllocations(isActive, page, limit, clientId, assetId),
    staleTime: 5000,
  });
}

async function createAllocation(allocation: Omit<Allocation, "id">) {
  const { data } = await api.post<Allocation>("/allocations", allocation);
  return data;
}

async function updateAllocation(id: number, allocation: Partial<Allocation>) {
  const { data } = await api.put<Allocation>(`/allocations/${id}`, allocation);
  return data;
}

async function deleteAllocation(id: number) {
  const { data } = await api.delete(`/allocations/${id}`);
  return data;
}

export {
  LoadAndGetAllocations,
  createAllocation,
  updateAllocation,
  deleteAllocation
}