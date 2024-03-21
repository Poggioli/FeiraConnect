import { PaginationRequest, PaginationResponse } from "@/services/api";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Frequency =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type SearchFarmersMarketByCitySlug = {
  id: string;
  name: string;
  neighborhood: {
    name: string;
    location: {
      lat: number;
      long: number;
    };
  };
  frequency: Frequency;
  startTime: Date;
  endTime: Date;
};

export type SearchFarmersMarketByCitySlugParams = PaginationRequest & {
  query: {
    city: string;
    frequency?: Frequency;
    hour?: number;
  };
};

export type SearchFarmersMarketByCitySlugResponse =
  PaginationResponse<SearchFarmersMarketByCitySlug>;

export type UseSearchFarmersMarketByCitySlugOptions = Omit<
  UseInfiniteQueryOptions<
    SearchFarmersMarketByCitySlugResponse,
    AxiosError,
    InfiniteData<SearchFarmersMarketByCitySlugResponse>,
    SearchFarmersMarketByCitySlugResponse,
    [
      "searchFarmersMarketByCitySlug",
      string,
      Frequency | undefined,
      number | undefined,
    ],
    number
  >,
  "queryKey" | "getNextPageParam" | "initialPageParam"
>;
