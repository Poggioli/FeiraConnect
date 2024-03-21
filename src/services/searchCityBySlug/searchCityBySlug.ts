import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseSearchCityBySlug, UseSearchCityBySlugOptions } from "./types";

const queryKey = "searchCityBySlug" as const;
const url = "cities" as const;

export function createSearchCityBySlugQueryKey(
  slug: string
): ["searchCityBySlug", { slug: string }] {
  return [queryKey, { slug }];
}

export function useSearchCityBySlug(
  slug: string,
  options?: UseSearchCityBySlugOptions
) {
  return useQuery<
    UseSearchCityBySlug,
    AxiosError,
    UseSearchCityBySlug,
    ["searchCityBySlug", { slug: string }]
  >({
    ...options,
    queryKey: createSearchCityBySlugQueryKey(slug),
    queryFn: async () => {
      const res = await api.get<UseSearchCityBySlug>(`${url}/${slug}`);
      return res.data;
    },
  });
}
