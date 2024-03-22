import { DEFAULT_PER_PAGE, api } from "@/services/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { useMemo } from "react";
import {
  Frequency,
  SearchStreetMarketByCitySlug,
  SearchStreetMarketByCitySlugParams,
  SearchStreetMarketByCitySlugResponse,
  UseSearchStreetMarketByCitySlugOptions,
} from "./types";

const url = "street-markets" as const;

async function fetchSearchStreetMarketByCitySlug(
  { page, perPage, query }: SearchStreetMarketByCitySlugParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig<any> | undefined = {}
): Promise<SearchStreetMarketByCitySlugResponse> {
  const { city, ...searchParams } = query;
  const params = qs.stringify({ page, perPage, ...searchParams });
  const res = await api.get<SearchStreetMarketByCitySlugResponse>(
    `cities/${city}/${url}?${params}`,
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

const queryKey = "searchStreetMarketByCitySlug" as const;

type CreateSearchKeyType = {
  city: string;
  frequency?: Frequency;
  hour?: number;
};
export function createUseSearchStreetMarketByCitySlugQueryKey({
  city,
  frequency,
  hour,
}: CreateSearchKeyType): [
  "searchStreetMarketByCitySlug",
  string,
  Frequency | undefined,
  number | undefined,
] {
  return [queryKey, city, frequency, hour];
}

export function useSearchStreetMarketByCitySlug(
  { query }: Pick<SearchStreetMarketByCitySlugParams, "query">,
  options?: UseSearchStreetMarketByCitySlugOptions
) {
  const result = useInfiniteQuery<
    SearchStreetMarketByCitySlugResponse,
    AxiosError,
    InfiniteData<SearchStreetMarketByCitySlugResponse>,
    [
      "searchStreetMarketByCitySlug",
      string,
      Frequency | undefined,
      number | undefined,
    ],
    number
  >({
    ...options,
    queryKey: createUseSearchStreetMarketByCitySlugQueryKey({ ...query }),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) =>
      fetchSearchStreetMarketByCitySlug(
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

  const dataItems: SearchStreetMarketByCitySlug[] = useMemo(
    () =>
      (result.data?.pages || []).reduce(
        (
          acc: SearchStreetMarketByCitySlug[],
          page: SearchStreetMarketByCitySlugResponse
        ) => [...acc, ...page.items],
        []
      ),
    [result.data]
  );

  return { ...result, dataItems };
}
