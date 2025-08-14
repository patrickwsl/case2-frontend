export interface Asset {
  id?: number;
  ticker: string;
  name?: string;
}

export interface AssetPrice {
  symbol: string;
  name: string;
  exchange: string;
  is_etf: boolean;
  price: number;
  currency: string | null;
}

export interface YahooAssetsResponse {
  items: AssetPrice[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}