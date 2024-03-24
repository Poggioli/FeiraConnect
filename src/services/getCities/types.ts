import { PaginationRequest, PaginationResponse } from "@/services/api";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type GetCities = {
  id: string,
  slug: string;
  name: string;
};

export type GetCitiesParams = PaginationRequest<{
  q: string;
}>;

export type GetCitiesResponse = PaginationResponse<GetCities>;

export type UseGetCitiesOptions = Omit<
  UseInfiniteQueryOptions<
    GetCitiesResponse,
    AxiosError,
    InfiniteData<GetCitiesResponse>,
    GetCitiesResponse,
    ["getCities", string],
    number
  >,
  "queryKey" | "getNextPageParam" | "initialPageParam"
>;
