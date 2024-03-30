import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  UseGetStreetMarketBySlug, UseGetStreetMarketBySlugOptions, UseGetStreetMarketBySlugQueryKey
} from "./types";

const queryKey = "getStreetMarketBySlug" as const;
const url = 'street-markets' as const;

export function createGetStreetMarketBySlugQueryKey(
  slug: string
): UseGetStreetMarketBySlugQueryKey {
  return [queryKey, slug];
}

export function useGetStreetMarketBySlug(options: UseGetStreetMarketBySlugOptions) {
  return useQuery<
    UseGetStreetMarketBySlug,
    AxiosError,
    UseGetStreetMarketBySlug,
    UseGetStreetMarketBySlugQueryKey
  >({
    ...options,
    queryKey: options.queryKey,
    queryFn: async ({ queryKey: { "1": slug } }) => {
      const res = await api.get<UseGetStreetMarketBySlug>(`${url}/${slug}`);
      return res.data;
    }
  })
}