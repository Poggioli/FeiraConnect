import { DEFAULT_PER_PAGE, api } from "@/services/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { useMemo } from "react";
import {
  GetCities,
  GetCitiesParams,
  GetCitiesResponse,
  UseGetCitiesOptions,
} from "./types";

const url = 'cities' as const

async function fetchGetCities(
  { page, perPage, q }: GetCitiesParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig<any> | undefined = {}
): Promise<GetCitiesResponse> {
  const params = qs.stringify({ page, perPage, q });
  const res = await api.get<GetCitiesResponse>(
    `${url}?${params}`,
    config
  );
  return res.data;
}

const queryKey = "getCities" as const;

export function createUseGetCitiesQueryKey(query: string): ["getCities", string] {
  return [queryKey, query];
}

export function useGetCities(
  query: string,
  options?: UseGetCitiesOptions
) {
  const result = useInfiniteQuery<
    GetCitiesResponse,
    AxiosError,
    InfiniteData<GetCitiesResponse>,
    ["getCities", string],
    number
  >({
    ...options,
    queryKey: createUseGetCitiesQueryKey(query),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) =>
      fetchGetCities(
        {
          page: pageParam,
          perPage: DEFAULT_PER_PAGE,
          q: query
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

  const dataItems: GetCities[] = useMemo(
    () =>
      (result.data?.pages || []).reduce(
        (acc: GetCities[], page: GetCitiesResponse) => [
          ...acc,
          ...page.items,
        ],
        []
      ),
    [result.data]
  );

  const isEmpty: boolean = useMemo(() => !dataItems.length, [dataItems]);
  const isFilled: boolean = useMemo(() => !!dataItems.length, [dataItems]);

  return { ...result, dataItems, isEmpty, isFilled };
}
