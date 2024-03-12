import { InfiniteData, UndefinedInitialDataInfiniteOptions, useInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_PER_PAGE, api } from "@/services/api";
import { SearchCityByName, SearchCityByNameParams, SearchCityByNameResponse } from "./types";
import qs from "qs";
import { AxiosError } from "axios";
import { useMemo } from "react";

async function fetchSearchCityByName({ page, perPage, query }: SearchCityByNameParams): Promise<SearchCityByNameResponse> {
  const params = qs.stringify({ q: query, page, perPage })
  const res = await api.get<SearchCityByNameResponse>(`citys-by-name?${params}`);
  return res.data;
}

const queryKey = "searchCityByName" as const

export function useSearchCityByName(
  { query }: Pick<SearchCityByNameParams, "query">,
  options?:
    UndefinedInitialDataInfiniteOptions<
      SearchCityByNameResponse,
      AxiosError,
      InfiniteData<SearchCityByNameResponse>,
      ["searchCityByName", Pick<SearchCityByNameParams, "query">],
      number
    >
) {
  const result = useInfiniteQuery<
    SearchCityByNameResponse,
    AxiosError,
    InfiniteData<SearchCityByNameResponse>,
    ["searchCityByName", Pick<SearchCityByNameParams, "query">],
    number
  >({
    ...options,
    queryKey: [queryKey, { query }],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, queryKey }) => fetchSearchCityByName({ page: pageParam, perPage: DEFAULT_PER_PAGE, query: queryKey[1].query }),
    getNextPageParam: (lastPage) => lastPage.metadata.isLastPage ? undefined : lastPage.metadata.currentPage + 1,
  });

  const dataItems: SearchCityByName[] = useMemo(() => (result.data?.pages || [])
    .reduce((acc: SearchCityByName[], page: SearchCityByNameResponse) => [...acc, ...page.items], []), [result.data]);

  return { ...result, dataItems }
}