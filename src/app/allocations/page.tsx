"use client";

import { useState, useEffect } from "react";

import { Allocation } from "./interfaces";
import AllocationModal from "./components/AllocationsModal";
import { createAllocation, deleteAllocation, LoadAndGetAllocations, updateAllocation } from "@/services/allocations/data";
import { LoadAndGetClients } from "@/services/client/data";
import { LoadAndGetAssets } from "@/services/assets/data";

export default function AllocationsPage() {
  const [isActive, setIsActive] = useState<boolean | undefined>(true);
  const [page, setPage] = useState(1);
  const [clientFilter, setClientFilter] = useState<number | "">("");
  const [assetFilter, setAssetFilter] = useState<number | "">("");
  const [showModal, setShowModal] = useState(false);
  const [allocationToEdit, setAllocationToEdit] = useState<Allocation | undefined>(undefined);
  const allocationsPerPage = 10;

  const { data, isLoading, refetch } = LoadAndGetAllocations(
    isActive,
    page,
    allocationsPerPage,
    clientFilter,
    assetFilter
  );

  const { data: clients, isLoading: isLoadingClients } = LoadAndGetClients();
  const { data: assets, isLoading: isLoadingAssets } = LoadAndGetAssets();

  if (isLoading) return <p>Loading...</p>;

  const hasNextPage = data && data.length === allocationsPerPage;

  const handleSave = async (allocation: Omit<Allocation, "id">, id?: number) => {
    try {
      if (id) {
        await updateAllocation(id, allocation);
      } else {
        await createAllocation(allocation);
      }
      setShowModal(false);
      setAllocationToEdit(undefined);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAllocation(id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black dark:text-white text-2xl font-bold">Allocations</h1>
        <button
          onClick={() => { setAllocationToEdit(undefined); setShowModal(true); }}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-blue-600"
        >
          Add Allocation
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <select
          value={isActive ? "active" : isActive === false ? "inactive" : ""}
          onChange={(e) => {
            const val = e.target.value;
            setIsActive(val === "active" ? true : val === "inactive" ? false : undefined);
            setPage(1);
          }}
          className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white border-gray-400 dark:border-gray-600"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={clientFilter}
          onChange={(e) => { setClientFilter(e.target.value ? Number(e.target.value) : ""); setPage(1); }}
          className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white border-gray-400 dark:border-gray-600"
        >
          <option value="">All Clients</option>
          {clients?.map((client) => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>

        <select
          value={assetFilter}
          onChange={(e) => { setAssetFilter(e.target.value ? Number(e.target.value) : ""); setPage(1); }}
          className="p-2 border rounded bg-white dark:bg-black text-black dark:text-white border-gray-400 dark:border-gray-600"
        >
          <option value="">All Assets</option>
          {assets?.map((asset) => (
            <option key={asset.id} value={asset.id}>{asset.ticker}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-gray-300 dark:bg-gray-500 rounded shadow p-4">
        <table className="w-full table-auto text-black dark:text-white">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="text-left p-2">Client</th>
              <th className="text-left p-2">Asset</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Buy Price</th>
              <th className="text-left p-2">Buy Date</th>
              <th className="text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((allocation) => (
              <tr key={allocation.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900">
                <td className="p-2">{allocation.client?.name}</td>
                <td className="p-2">{allocation.asset?.ticker}</td>
                <td className="p-2">{allocation.quantity}</td>
                <td className="p-2">{allocation.buy_price}</td>
                <td className="p-2">{allocation.buy_date}</td>
                <td className="p-2 text-center flex justify-center gap-2">
                  <button
                    className="px-2 py-1 bg-gray-400 rounded hover:bg-yellow-500"
                    onClick={() => { setAllocationToEdit(allocation); setShowModal(true); }}
                  >
                    ✏️
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDelete(allocation.id)}
                  >
                    🗑️
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

      <AllocationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        clients={clients}
        assets={assets}
        allocationToEdit={allocationToEdit}
      />
    </div>
  );
}
