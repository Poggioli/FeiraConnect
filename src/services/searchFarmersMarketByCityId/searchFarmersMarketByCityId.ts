import { DEFAULT_PER_PAGE, api } from "@/services/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { useMemo } from "react";
import {
  Frequency,
  SearchFarmersMarketByCityId,
  SearchFarmersMarketByCityIdParams,
  SearchFarmersMarketByCityIdResponse,
  UseSearchFarmersMarketByCityIdOptions,
} from "./types";

const url = "farmers-market" as const;

async function fetchSearchFarmersMarketByCityId(
  { page, perPage, query }: SearchFarmersMarketByCityIdParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig<any> | undefined = {}
): Promise<SearchFarmersMarketByCityIdResponse> {
  const { city, ...searchParams } = query;
  const params = qs.stringify({ page, perPage, ...searchParams });
  const res = await api.get<SearchFarmersMarketByCityIdResponse>(
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

const queryKey = "searchFarmersMarketByCitySlug" as const;

type CreateSearchKeyType = {
  city: string;
  frequency?: Frequency;
  hour?: number;
};
export function createUseSearchFarmersMarketByCityIdQueryKey({
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

export function useSearchFarmersMarketByCityId(
  { query }: Pick<SearchFarmersMarketByCityIdParams, "query">,
  options?: UseSearchFarmersMarketByCityIdOptions
) {
  const result = useInfiniteQuery<
    SearchFarmersMarketByCityIdResponse,
    AxiosError,
    InfiniteData<SearchFarmersMarketByCityIdResponse>,
    [
      "searchFarmersMarketByCitySlug",
      string,
      Frequency | undefined,
      number | undefined,
    ],
    number
  >({
    ...options,
    queryKey: createUseSearchFarmersMarketByCityIdQueryKey({ ...query }),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) =>
      fetchSearchFarmersMarketByCityId(
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

  const dataItems: SearchFarmersMarketByCityId[] = useMemo(
    () =>
      (result.data?.pages || []).reduce(
        (
          acc: SearchFarmersMarketByCityId[],
          page: SearchFarmersMarketByCityIdResponse
        ) => [...acc, ...page.items],
        []
      ),
    [result.data]
  );

  return { ...result, dataItems };
}
