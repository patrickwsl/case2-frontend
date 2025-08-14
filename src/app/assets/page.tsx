"use client";

import { useState, useMemo } from "react";
import { LoadAndGetAssetsByYahoo } from "@/services/assets/data";
import { LoadAndGetClients } from "@/services/client/data";
import { createAllocation } from "@/services/allocations/data";
import { AllocationCreateBySymbol } from "../allocations/interfaces";
import AllocationModal from "../allocations/components/AllocationsModal";

export default function AssetsFromYahooList() {
  const { data: assetsYahoo, isLoading: isLoadingAssetsYahoo } = LoadAndGetAssetsByYahoo();
  const { data: clients, isLoading: isLoadingClients } = LoadAndGetClients();

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filteredAssets = useMemo(() => {
    if (!assetsYahoo?.items) return [];
    return assetsYahoo.items.filter(a =>
      a.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assetsYahoo, searchTerm]);

  const totalPages = Math.ceil(filteredAssets.length / perPage);
  const paginatedAssets = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredAssets.slice(start, start + perPage);
  }, [filteredAssets, page]);

  const handleSave = async (data: AllocationCreateBySymbol) => {
    try {
      await createAllocation(data);
      setShowModal(false);
      setSelectedAsset(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoadingAssetsYahoo) return <p>Loading assets...</p>;

  return (
    <div className="p-4">
      <h1 className="text-black dark:text-white text-2xl font-bold mb-4">Assets from Yahoo</h1>

      <input
        type="text"
        placeholder="Search by ticker or name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        className="bg-white dark:bg-black p-2 border rounded w-full mb-4 text-black"
      />

      <div className="overflow-x-auto bg-gray-300 dark:bg-gray-500 rounded shadow p-4">
        <table className="w-full table-auto text-black dark:text-white">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="text-left p-2">Ticker</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Price</th>
              <th className="text-center p-2">Add Allocation</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssets.map((asset) => (
              <tr key={asset.symbol} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900">
                <td className="p-2">{asset.symbol}</td>
                <td className="p-2">{asset.name || "—"}</td>
                <td className="p-2">
                  {asset.price != null ? `$${asset.price.toFixed(2)}` : "N/A"}
                </td>
                <td className="p-2 text-center">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => {
                      setSelectedAsset(asset);
                      setShowModal(true);
                    }}
                  >
                    ➕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="text-black dark:text-white px-3 py-1 bg-gray-400 rounded disabled:opacity-50"
              onClick={() => setPage(p => p - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="text-black dark:text-white">
              Page {page} of {totalPages}
            </span>
            <button
              className="text-black dark:text-white px-3 py-1 bg-gray-400 rounded disabled:opacity-50"
              onClick={() => setPage(p => p + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <AllocationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        clients={clients}
        assetsFromYahoo={assetsYahoo}
        allocationToEdit={
          selectedAsset
            ? {
                asset_symbol: selectedAsset.symbol,
                asset_name: selectedAsset.name,
                buy_price: selectedAsset.price ?? 0,
              }
            : undefined
        }
        isLoadingAssetsYahoo={isLoadingAssetsYahoo}
        isLoadingClients={isLoadingClients}
      />
    </div>
  );
}
