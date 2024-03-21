import { DEFAULT_PER_PAGE, api } from "@/services/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { useMemo } from "react";
import {
  SearchCityByName,
  SearchCityByNameParams,
  SearchCityByNameResponse,
  UseSearchCityByNameOptions,
} from "./types";

async function fetchSearchCityByName(
  { page, perPage, query }: SearchCityByNameParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig<any> | undefined = {}
): Promise<SearchCityByNameResponse> {
  const params = qs.stringify({ q: query, page, perPage });
  const res = await api.get<SearchCityByNameResponse>(
    `cities?${params}`,
    config
  );
  return res.data;
}

const queryKey = "searchCityByName" as const;

export function createUseSearchCityByNameQueryKey(
  query: string
): ["searchCityByName", { query: string }] {
  return [queryKey, { query }];
}

export function useSearchCityByName(
  { query }: Pick<SearchCityByNameParams, "query">,
  options?: UseSearchCityByNameOptions
) {
  const result = useInfiniteQuery<
    SearchCityByNameResponse,
    AxiosError,
    InfiniteData<SearchCityByNameResponse>,
    ["searchCityByName", Pick<SearchCityByNameParams, "query">],
    number
  >({
    ...options,
    queryKey: createUseSearchCityByNameQueryKey(query),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, queryKey, signal }) =>
      fetchSearchCityByName(
        {
          page: pageParam,
          perPage: DEFAULT_PER_PAGE,
          query: queryKey[1].query,
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

  const dataItems: SearchCityByName[] = useMemo(
    () =>
      (result.data?.pages || []).reduce(
        (acc: SearchCityByName[], page: SearchCityByNameResponse) => [
          ...acc,
          ...page.items,
        ],
        []
      ),
    [result.data]
  );

  return { ...result, dataItems };
}
