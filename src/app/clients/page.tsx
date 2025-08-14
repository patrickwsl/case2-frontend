"use client";

import { useState, useEffect } from "react";
import { LoadAndGetClients, createClient, updateClient, deleteClient } from "@/services/client/data";
import { Client } from "@/services/client/interface";
import ClientModal from "./components/ClientModal";

export default function ClientsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [status, setStatus] = useState("");
  const [clientsPerPage] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | undefined>(undefined);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, refetch } = LoadAndGetClients(page, debouncedSearch, status, clientsPerPage);

  if (isLoading) return <p>Loading...</p>;

  const hasNextPage = data && data.length === clientsPerPage;

  const handleSave = async (client: { name: string; email: string; status: "active" | "inactive" }, id?: number) => {
    try {
      if (id) {
        await updateClient(id, client);
      } else {
        await createClient(client);
      }
      setShowModal(false);
      setClientToEdit(undefined);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteClient(id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black dark:text-white text-2xl font-bold">Clients</h1>
        <button
          onClick={() => {
            setClientToEdit(undefined);
            setShowModal(true);
          }}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-blue-600"
        >
          Adicionar Cliente
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="p-2 border rounded flex-1 bg-white dark:bg-black text-black dark:text-white border-gray-400 dark:border-gray-600"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white border-gray-400 dark:border-gray-600"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-gray-300 dark:bg-gray-500 rounded shadow p-4">
        <table className="w-full table-auto text-black dark:text-white">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Status</th>
              <th className="text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((client: Client) => (
              <tr key={client.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900">
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">{client.status}</td>
                <td className="p-2 text-center flex justify-center gap-2">
                  <button
                    className="px-2 py-1 bg-gray-400 rounded hover:bg-yellow-500"
                    onClick={() => {
                      setClientToEdit(client);
                      setShowModal(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-black dark:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536M4 20h4.586l10.293-10.293a1 1 0 00-1.414-1.414L7.172 18.586A1 1 0 016 20z"
                      />
                    </svg>
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDelete(client.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded bg-gray-400 dark:bg-gray-700 text-black dark:text-white disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={!hasNextPage}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded bg-gray-400 dark:bg-gray-700 text-black dark:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ClientModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        clientToEdit={clientToEdit}
      />
    </div>
  );
}
