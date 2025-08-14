"use client";

import { useState, useEffect } from "react";
import { ClientModalProps } from "../interfaces/ClientModal";


export default function ClientModal({ isOpen, onClose, onSave, clientToEdit }: ClientModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  useEffect(() => {
    if (clientToEdit) {
      setName(clientToEdit.name);
      setEmail(clientToEdit.email);
      setStatus(clientToEdit.status as "active" | "inactive");
    } else {
      setName("");
      setEmail("");
      setStatus("active");
    }
  }, [clientToEdit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md">
        <h2 className="text-black dark:text-white text-xl font-bold mb-4">{clientToEdit ? "Editar Cliente" : "Novo Cliente"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded bg-white dark:bg-black text-black dark:text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded bg-white dark:bg-black text-black dark:text-white"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
          className="w-full p-2 mb-4 border rounded bg-white dark:bg-black text-black dark:text-white"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, email, status }, clientToEdit?.id)}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
