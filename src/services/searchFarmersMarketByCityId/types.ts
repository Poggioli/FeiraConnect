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

export type SearchFarmersMarketByCityId = {
  id: string;
  name: string;
  neighborhood: {
    name: string;
    slug: string;
    location: {
      lat: number;
      long: number;
    };
  };
  frequency: Frequency;
  startTime: Date;
  endTime: Date;
};

export type SearchFarmersMarketByCityIdParams = PaginationRequest & {
  query: {
    city: string;
    frequency?: Frequency;
    hour?: number;
  };
};

export type SearchFarmersMarketByCityIdResponse =
  PaginationResponse<SearchFarmersMarketByCityId>;

export type UseSearchFarmersMarketByCityIdOptions = Omit<
  UseInfiniteQueryOptions<
    SearchFarmersMarketByCityIdResponse,
    AxiosError,
    InfiniteData<SearchFarmersMarketByCityIdResponse>,
    SearchFarmersMarketByCityIdResponse,
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
