import { api } from "@/lib/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Client } from "../interface";

async function getClients(
  page = 1,
  search = "",
  status = "",
  limit = 10
): Promise<Client[]> {
  const { data } = await api.get<Client[]>("/clients", {
    params: { page, search, status, limit },
  });
  return data;
}

async function createClient(client: {
  name: string;
  email: string;
  status: "active" | "inactive";
}): Promise<Client> {
  const { data } = await api.post("/clients", client);
  return data;
}

async function updateClient(
  id: number,
  client: { name: string; email: string; status: "active" | "inactive" }
): Promise<Client> {
  const { data } = await api.put(`/clients/${id}`, client);
  return data;
}

async function deleteClient(id: number): Promise<void> {
  await api.delete(`/clients/${id}`);
}

function LoadAndGetClients(
  page = 1,
  search = "",
  status = "",
  clientsPerPage = 10
): UseQueryResult<Client[], Error> {
  return useQuery<Client[], Error>({
    queryKey: ["clients", page, search, status],
    queryFn: () => getClients(page, search, status, clientsPerPage),
    staleTime: 5000,
  });
}

export {
  LoadAndGetClients,
  createClient,
  updateClient,
  deleteClient
}