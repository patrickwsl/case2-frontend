import { Asset } from "@/services/assets/interfaces";
import { Client } from "@/services/client/interface";

export interface Allocation {
  id: number;
  client_id: number;
  asset_id: number;
  quantity: number;
  buy_price: number;
  buy_date: string;
  is_active?: boolean;
  client?: Client;
  asset?: Asset;
}

export interface AllocationCreateBySymbol {
    client_id: number;
    asset_symbol: string;
    quantity: number;
    buy_price: number;
    buy_date: string;
  }

