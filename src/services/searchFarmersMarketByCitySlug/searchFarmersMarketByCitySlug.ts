import { DEFAULT_PER_PAGE, api } from "@/services/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { useMemo } from "react";
import {
  Frequency,
  SearchFarmersMarketByCitySlug,
  SearchFarmersMarketByCitySlugParams,
  SearchFarmersMarketByCitySlugResponse,
  UseSearchFarmersMarketByCitySlugOptions,
} from "./types";

const url = "farmers-market" as const;

async function fetchSearchFarmersMarketByCitySlug(
  { page, perPage, query }: SearchFarmersMarketByCitySlugParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig<any> | undefined = {}
): Promise<SearchFarmersMarketByCitySlugResponse> {
  const { city, ...searchParams } = query;
  const params = qs.stringify({ page, perPage, ...searchParams });
  const res = await api.get<SearchFarmersMarketByCitySlugResponse>(
    `${city}/${url}?${params}`,
    config
  );

  const mappedValue = {
    metadata: res.data.metadata,
    items: res.data.items.map((item) => ({
      ...item,
      endTime: new Date(item.endTime),
      startTime: new Date(item.startTime),
    })),
  };

  return mappedValue;
}

const queryKey = "searchFarmersMarketByCitySlug" as const;

type CreateSearchKeyType = {
  city: string;
  frequency?: Frequency;
  hour?: number;
};
export function createUseSearchFarmersMarketByCitySlugQueryKey({
  city,
  frequency,
  hour,
}: CreateSearchKeyType): [
  "searchFarmersMarketByCitySlug",
  string,
  Frequency | undefined,
  number | undefined,
] {
  return [queryKey, city, frequency, hour];
}

export function useSearchFarmersMarketByCitySlug(
  { query }: Pick<SearchFarmersMarketByCitySlugParams, "query">,
  options?: UseSearchFarmersMarketByCitySlugOptions
) {
  const result = useInfiniteQuery<
    SearchFarmersMarketByCitySlugResponse,
    AxiosError,
    InfiniteData<SearchFarmersMarketByCitySlugResponse>,
    [
      "searchFarmersMarketByCitySlug",
      string,
      Frequency | undefined,
      number | undefined,
    ],
    number
  >({
    ...options,
    queryKey: createUseSearchFarmersMarketByCitySlugQueryKey({ ...query }),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) =>
      fetchSearchFarmersMarketByCitySlug(
        {
          page: pageParam,
          perPage: DEFAULT_PER_PAGE,
          query,
        },
        {
          signal,
        }
      ),
    getNextPageParam: (lastPage) =>
      lastPage.metadata.isLastPage
        ? undefined
        : lastPage.metadata.currentPage + 1,
  });

  const dataItems: SearchFarmersMarketByCitySlug[] = useMemo(
    () =>
      (result.data?.pages || []).reduce(
        (
          acc: SearchFarmersMarketByCitySlug[],
          page: SearchFarmersMarketByCitySlugResponse
        ) => [...acc, ...page.items],
        []
      ),
    [result.data]
  );

  return { ...result, dataItems };
}
