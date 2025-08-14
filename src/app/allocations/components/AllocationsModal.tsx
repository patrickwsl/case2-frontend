"use client";

import { Asset } from "@/services/assets/interfaces";
import { Client } from "@/services/client/interface";
import { useState, useEffect } from "react";

interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    client_id: number;
    asset_id: number;
    quantity: number;
    buy_price: number;
    buy_date: string;
  }) => void;
  clients: Client[] | undefined;
  assets: Asset[] | undefined;
  allocationToEdit?: any;
}

export default function AllocationModal({
  isOpen,
  onClose,
  onSave,
  clients,
  assets,
  allocationToEdit,
}: AllocationModalProps) {
  const [clientId, setClientId] = useState<number | undefined>(allocationToEdit?.client_id);
  const [assetId, setAssetId] = useState<number | undefined>(allocationToEdit?.asset_id);
  const [quantity, setQuantity] = useState<number>(allocationToEdit?.quantity || 0);
  const [buyPrice, setBuyPrice] = useState<number>(allocationToEdit?.buy_price || 0);
  const [buyDate, setBuyDate] = useState<string>(allocationToEdit?.buy_date || "");

  useEffect(() => {
    if (allocationToEdit) {
      setClientId(allocationToEdit.client_id);
      setAssetId(allocationToEdit.asset_id);
      setQuantity(allocationToEdit.quantity);
      setBuyPrice(allocationToEdit.buy_price);
      setBuyDate(allocationToEdit.buy_date);
    }
  }, [allocationToEdit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black p-6 rounded shadow w-full max-w-md">
        <h2 className="text-black dark:text-white text-xl font-bold mb-4">
          {allocationToEdit ? "Edit Allocation" : "New Allocation"}
        </h2>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-black dark:text-white">Client</label>
          <select value={clientId} onChange={(e) => setClientId(Number(e.target.value))} className="p-2 border rounded text-black">
            <option value="">Select a client</option>
            {clients?.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <label className="text-black dark:text-white">Asset</label>
          <select value={assetId} onChange={(e) => setAssetId(Number(e.target.value))} className="p-2 border rounded text-black">
            <option value="">Select an asset</option>
            {assets?.map(a => (
              <option key={a.id} value={a.id}>{a.ticker} - {a.name}</option>
            ))}
          </select>

          <label className="text-black dark:text-white">Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="p-2 border rounded text-black" />

          <label className="text-black dark:text-white">Buy Price</label>
          <input type="number" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} className="p-2 border rounded text-black" />

          <label className="text-black dark:text-white">Buy Date</label>
          <input type="date" value={buyDate} onChange={(e) => setBuyDate(e.target.value)} className="p-2 border rounded text-black" />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-white px-4 py-2 bg-red-500 rounded">Cancel</button>
          <button
            onClick={() => {
              if (clientId && assetId) onSave({ client_id: clientId, asset_id: assetId, quantity, buy_price: buyPrice, buy_date: buyDate });
            }}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
