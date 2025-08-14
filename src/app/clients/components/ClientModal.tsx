"use client";

import { useState, useEffect } from "react";
import { ClientModalProps } from "../interfaces/ClientModal";
import { z, ZodIssue } from "zod";

const clientSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  email: z.string().email("E-mail inválido"),
  status: z.enum(["active", "inactive"], {
    message: "Status inválido",
  }),
});

export default function ClientModal({ isOpen, onClose, onSave, clientToEdit }: ClientModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [errors, setErrors] = useState<{ name?: string; email?: string; status?: string }>({});

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
    setErrors({});
  }, [clientToEdit]);

  if (!isOpen) return null;

  const handleSaveClick = () => {
    const validation = clientSchema.safeParse({ name, email, status });

    if (!validation.success) {
      const fieldErrors: { name?: string; email?: string; status?: string } = {};
      validation.error.issues.forEach((err: ZodIssue) => {
        const fieldName = err.path[0] as "name" | "email" | "status";
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    onSave({ name, email, status }, clientToEdit?.id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md">
        <h2 className="text-black dark:text-white text-xl font-bold mb-4">
          {clientToEdit ? "Editar Cliente" : "Novo Cliente"}
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-1 border rounded bg-white dark:bg-black text-black dark:text-white"
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-1 border rounded bg-white dark:bg-black text-black dark:text-white"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
          className="w-full p-2 mb-1 border rounded bg-white dark:bg-black text-black dark:text-white"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm mb-2">{errors.status}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
