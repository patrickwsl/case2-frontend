"use client";

import { useClients } from "@/services/client/data";
import { useState } from "react";

export default function ClientsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading } = useClients(page, search, status);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Clients</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <ul>
        {data?.items.map((client: any) => (
          <li key={client.id}>
            {client.name} - {client.email} - {client.is_active ? "Active" : "Inactive"}
          </li>
        ))}
      </ul>

      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
        Prev
      </button>
      <button
        disabled={page === data?.total_pages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}
