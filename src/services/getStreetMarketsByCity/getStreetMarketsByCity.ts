import { DEFAULT_PER_PAGE, api } from "@/services/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { useMemo } from "react";
import {
  GetStreetMarketsByCity,
  GetStreetMarketsByCityParams,
  GetStreetMarketsByCityQuery,
  GetStreetMarketsByCityResponse,
  GetStreetMarketsByCitySlugQueryKey,
  UseGetStreetMarketsByCityOptions,
} from "./types";

const url = "street-markets" as const;

async function fetchGetStreetMarketsByCity(
  { page, perPage, city, ...restParams }: GetStreetMarketsByCityParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig<any> | undefined = {}
): Promise<GetStreetMarketsByCityResponse> {
  const params = qs.stringify({ page, perPage, ...restParams });
  const res = await api.get<GetStreetMarketsByCityResponse>(
    `${url}/${city}?${params}`,
    config
  );
  return res.data;
}

const queryKey = "getStreetMarketsByCity" as const;

export function createUseGetStreetMarketsByCityQueryKey(
  query: GetStreetMarketsByCityQuery
): GetStreetMarketsByCitySlugQueryKey {
  return [queryKey, query];
}

export function useGetStreetMarketsByCity(
  query: GetStreetMarketsByCityQuery,
  options?: UseGetStreetMarketsByCityOptions
) {
  const result = useInfiniteQuery<
    GetStreetMarketsByCityResponse,
    AxiosError,
    InfiniteData<GetStreetMarketsByCityResponse>,
    GetStreetMarketsByCitySlugQueryKey,
    number
  >({
    ...options,
    queryKey: createUseGetStreetMarketsByCityQueryKey(query),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) =>
      fetchGetStreetMarketsByCity(
        {
          page: pageParam,
          perPage: DEFAULT_PER_PAGE,
          ...query,
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

  const dataItems: GetStreetMarketsByCity[] = useMemo(
    () =>
      (result.data?.pages || []).reduce(
        (
          acc: GetStreetMarketsByCity[],
          page: GetStreetMarketsByCityResponse
        ) => [...acc, ...page.items],
        []
      ),
    [result.data]
  );

  const isEmpty: boolean = useMemo(() => !dataItems.length, [dataItems]);
  const isFilled: boolean = useMemo(() => !!dataItems.length, [dataItems]);

  return { ...result, dataItems, isEmpty, isFilled };
}
