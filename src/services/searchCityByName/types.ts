import { PaginationRequest, PaginationResponse } from "@/services/api";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type SearchCityByName = {
  id: string;
  slug: string;
  name: string;
};

export type SearchCityByNameParams = {
  query: string;
} & PaginationRequest;

export type SearchCityByNameResponse = PaginationResponse<SearchCityByName>;

export type UseSearchCityByNameOptions = Omit<
  UseInfiniteQueryOptions<
    SearchCityByNameResponse,
    AxiosError,
    InfiniteData<SearchCityByNameResponse>,
    SearchCityByNameResponse,
    ["searchCityByName", Pick<SearchCityByNameParams, "query">],
    number
  >,
  "queryKey" | "getNextPageParam" | "initialPageParam"
>;
