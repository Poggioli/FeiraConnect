import { DEFAULT_PER_PAGE, api } from "@/services/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { useMemo } from "react";
import {
  GetExhibitorsByStreetMarket,
  GetExhibitorsByStreetMarketParams,
  GetExhibitorsByStreetMarketQuery,
  GetExhibitorsByStreetMarketQueryKey,
  GetExhibitorsByStreetMarketResponse,
  UseGetExhibitorsByStreetMarketOptions,
} from "./types";

const url = "exhibitors" as const;

async function fetchGetExhibitorsByStreetMarket(
  {
    page,
    perPage,
    streetMarket,
    ...restParams
  }: GetExhibitorsByStreetMarketParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig<any> | undefined = {}
): Promise<GetExhibitorsByStreetMarketResponse> {
  const params = qs.stringify({ page, perPage, ...restParams });
  const res = await api.get<GetExhibitorsByStreetMarketResponse>(
    `${streetMarket}/${url}?${params}`,
    config
  );
  return res.data;
}

const queryKey = "getExhibitorsByStreetMarket" as const;

export function createUseGetExhibitorsByStreetMarketQueryKey(
  query: GetExhibitorsByStreetMarketQuery
): GetExhibitorsByStreetMarketQueryKey {
  return [queryKey, query];
}

export function useGetExhibitorsByStreetMarket(
  query: GetExhibitorsByStreetMarketQuery,
  options?: UseGetExhibitorsByStreetMarketOptions
) {
  const result = useInfiniteQuery<
    GetExhibitorsByStreetMarketResponse,
    AxiosError,
    InfiniteData<GetExhibitorsByStreetMarketResponse>,
    GetExhibitorsByStreetMarketQueryKey,
    number
  >({
    ...options,
    queryKey: createUseGetExhibitorsByStreetMarketQueryKey(query),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) =>
      fetchGetExhibitorsByStreetMarket(
        {
          page: pageParam,
          perPage: DEFAULT_PER_PAGE,
          ...query
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

  const dataItems: GetExhibitorsByStreetMarket[] = useMemo(
    () =>
      (result.data?.pages || []).reduce(
        (
          acc: GetExhibitorsByStreetMarket[],
          page: GetExhibitorsByStreetMarketResponse
        ) => [...acc, ...page.items],
        []
      ),
    [result.data]
  );

  const isEmpty: boolean = useMemo(() => !dataItems.length, [dataItems]);
  const isFilled: boolean = useMemo(() => !!dataItems.length, [dataItems]);

  return { ...result, dataItems, isEmpty, isFilled };
}
