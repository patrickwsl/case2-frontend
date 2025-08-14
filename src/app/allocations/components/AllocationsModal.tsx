"use client";

import { YahooAssetsResponse } from "@/services/assets/interfaces";
import { Client } from "@/services/client/interface";
import { useState, useEffect } from "react";
import { z } from "zod";

const allocationSchema = z.object({
  clientId: z.number().min(1, "Client is required"),
  assetSymbol: z.string().min(1, "Asset is required"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
  buyPrice: z.number().min(0.01, "Buy price must be positive"),
  buyDate: z.string().min(1, "Buy date is required"),
});

interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    client_id: number;
    asset_symbol: string;
    asset_name: string;
    quantity: number;
    buy_price: number;
    buy_date: string;
  }) => void;
  clients: Client[] | undefined;
  assetsFromYahoo?: YahooAssetsResponse;
  allocationToEdit?: any;
  isLoadingClients: boolean;
  isLoadingAssetsYahoo: boolean;
}

export default function AllocationModal({
  isOpen,
  onClose,
  onSave,
  clients,
  assetsFromYahoo,
  allocationToEdit,
  isLoadingClients,
  isLoadingAssetsYahoo,
}: AllocationModalProps) {
  const [clientId, setClientId] = useState<number | undefined>(allocationToEdit?.client_id);
  const [assetSymbol, setAssetSymbol] = useState<string>(allocationToEdit?.asset_symbol || "");
  const [assetName, setAssetName] = useState<string>(allocationToEdit?.asset_name || "");
  const [quantity, setQuantity] = useState<number>(allocationToEdit?.quantity || 0);
  const [buyPrice, setBuyPrice] = useState<number>(allocationToEdit?.buy_price || 0);
  const [buyDate, setBuyDate] = useState<string>(allocationToEdit?.buy_date || "");

  useEffect(() => {
    if (allocationToEdit) {
      setClientId(allocationToEdit.client_id);
      setAssetSymbol(allocationToEdit.asset_symbol || "");
      setAssetName(allocationToEdit.asset_name || "");
      setQuantity(allocationToEdit.quantity);
      setBuyPrice(allocationToEdit.buy_price);
      setBuyDate(allocationToEdit.buy_date);
    }
  }, [allocationToEdit]);

  const isLoading = isLoadingClients || isLoadingAssetsYahoo;

  useEffect(() => {
    if (!assetSymbol || !assetsFromYahoo?.items) return;

    const selected = assetsFromYahoo.items.find(a => a.symbol === assetSymbol);
    if (selected) {
      setBuyPrice(selected.price);
      setAssetName(selected.name);
    }
  }, [assetName, assetSymbol, assetsFromYahoo]);

  const handleSave = () => {
    try {
      allocationSchema.parse({
        clientId,
        assetSymbol,
        assetName,
        quantity,
        buyPrice,
        buyDate,
      });

      if (clientId && assetSymbol) {
        onSave({
          client_id: clientId,
          asset_symbol: assetSymbol,
          asset_name: assetName,
          quantity,
          buy_price: buyPrice,
          buy_date: buyDate,
        });
      }
    } catch (err: any) {
      alert(err.errors?.map((e: any) => e.message).join("\n") || err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black p-6 rounded shadow w-full max-w-md">
        <h2 className="text-black dark:text-white text-xl font-bold mb-4">
          {allocationToEdit ? "Edit Allocation" : "New Allocation"}
        </h2>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-black dark:text-white">Client</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(Number(e.target.value))}
            disabled={isLoadingClients}
            className="p-2 border rounded text-black"
          >
            <option value="">Select a client</option>
            {clients?.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <label className="text-black dark:text-white">Asset</label>
          {isLoadingAssetsYahoo ? (
            <select disabled className="p-2 border rounded text-black">
              <option>Loading...</option>
            </select>
          ) : (
            <select
              value={assetSymbol}
              onChange={(e) => setAssetSymbol(e.target.value)}
              className="p-2 border rounded text-black"
            >
              <option value="">Select an asset</option>
              {assetsFromYahoo?.items.map(a => (
                <option key={a.symbol} value={a.symbol}>
                  {a.symbol} - ${a.price != null ? a.price.toFixed(2) : "N/A"}
                </option>
              ))}
            </select>
          )}

          <label className="text-black dark:text-white">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-2 border rounded text-black"
          />

          <label className="text-black dark:text-white">Buy Price</label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(Number(e.target.value))}
            className="p-2 border rounded text-black"
          />

          <label className="text-black dark:text-white">Buy Date</label>
          <input
            type="date"
            value={buyDate}
            onChange={(e) => setBuyDate(e.target.value)}
            className="p-2 border rounded text-black"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-white px-4 py-2 bg-red-500 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !assetSymbol || !clientId}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
