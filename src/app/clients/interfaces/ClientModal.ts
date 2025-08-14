import { Client } from "@/services/client/interface";

export interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: { name: string; email: string; status: "active" | "inactive" }, id?: number) => void;
  clientToEdit?: Client;
}