import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  UseGetCityBySlug,
  UseGetCityBySlugOptions,
  UseGetCityBySlugQueryKey,
} from "./types";

const queryKey = "getCityBySlug" as const;
const url = "cities" as const;

export function createGetCityBySlugQueryKey(
  slug: string
): UseGetCityBySlugQueryKey {
  return [queryKey, slug];
}

export function useGetCityBySlug(options: UseGetCityBySlugOptions) {
  return useQuery<
    UseGetCityBySlug,
    AxiosError,
    UseGetCityBySlug,
    UseGetCityBySlugQueryKey
  >({
    ...options,
    queryKey: options.queryKey,
    queryFn: async ({ queryKey: { "1": slug } }) => {
      const res = await api.get<UseGetCityBySlug>(`${url}/${slug}`);
      return res.data;
    },
  });
}
