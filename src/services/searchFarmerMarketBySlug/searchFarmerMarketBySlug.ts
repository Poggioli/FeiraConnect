import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  UseSearchFarmerMarketBySlug,
  UseSearchFarmerMarketBySlugOptions,
} from "./types";

const queryKey = "searchFarmerMarketBySlug" as const;
const url = "farmers-market" as const;

export function createSearchFarmerMarketBySlugQueryKey(slug: string): [
  "searchFarmerMarketBySlug", { slug: string }
] {
  return [queryKey, { slug }];
}

export function useSearchFarmerMarketBySlug(
  slug: string,
  options?: UseSearchFarmerMarketBySlugOptions
) {
  return useQuery<
    UseSearchFarmerMarketBySlug,
    AxiosError,
    UseSearchFarmerMarketBySlug,
    ["searchFarmerMarketBySlug", { slug: string }]
  >({
    ...options,
    queryKey: createSearchFarmerMarketBySlugQueryKey(slug),
    queryFn: async () => {
      const res = await api.get<UseSearchFarmerMarketBySlug>(`${url}/${slug}`);
      return res.data;
    },
  });
}
