import { api } from "@/lib/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Asset, AssetPrice, YahooAssetsResponse } from "../interfaces";


async function getAssets(): Promise<Asset[]> {
  const { data } = await api.get<Asset[]>("/assets/list");
  return data;
}


async function listYahooAssets(): Promise<YahooAssetsResponse> {
  const { data } = await api.get<YahooAssetsResponse>("/assets/list-yahoo");
  return data;
}


async function getAssetPrice(symbol: string): Promise<AssetPrice> {
  const { data } = await api.get<AssetPrice>("/assets/price", { params: { symbol } });
  return data;
}


async function createAsset(asset: { ticker: string; name: string }) {
  const { data } = await api.post("/assets", asset);
  return data;
}


function LoadAndGetAssets(): UseQueryResult<Asset[], Error> {
  return useQuery<Asset[], Error>({
    queryKey: ["assets"],
    queryFn: getAssets,
    staleTime: 5000,
  });
}


function LoadAndGetAssetsByYahoo(): UseQueryResult<YahooAssetsResponse, Error> {
  return useQuery<YahooAssetsResponse, Error>({
    queryKey: ["assets-yahoo"],
    queryFn: listYahooAssets,
    staleTime: 1000 * 60 * 5,
  });
}

export { 
  getAssets, 
  getAssetPrice, 
  createAsset, 
  LoadAndGetAssets,
  LoadAndGetAssetsByYahoo
};
