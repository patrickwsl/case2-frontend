import { api } from "@/lib/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Asset, AssetPrice } from "../interfaces";


async function getAssets(): Promise<Asset[]> {
  const { data } = await api.get<Asset[]>("/assets/list");
  return data;
}

async function getAssetPrice(symbol: string): Promise<AssetPrice> {
  const { data } = await api.get<AssetPrice>("/assets/price", { params: { symbol } });
  return data;
}

async function createAsset(ticker: string, name: string): Promise<Asset> {
  const { data } = await api.post<Asset>("/assets/create", { ticker, name });
  return data;
}

function LoadAndGetAssets(): UseQueryResult<Asset[], Error> {
  return useQuery<Asset[], Error>({
    queryKey: ["assets"],
    queryFn: getAssets,
    staleTime: 5000,
  });
}

export { getAssets, getAssetPrice, createAsset, LoadAndGetAssets };
