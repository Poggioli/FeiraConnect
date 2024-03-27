import { PaginationRequest, PaginationResponse } from "@/services/api";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Weekday =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type GetStreetMarketsByCity = {
  id: string;
  name: string;
  slug: string;
  neighborhood: string;
  apperture: number;
  closure: number;
  weekday: Weekday;
};

export type GetStreetMarketsByCityQuery = {
  city: string;
  weekday?: Weekday;
  hour?: number;
};

export type GetStreetMarketsByCityParams = PaginationRequest &
  GetStreetMarketsByCityQuery;

export type GetStreetMarketsByCityResponse =
  PaginationResponse<GetStreetMarketsByCity>;

export type GetStreetMarketsByCitySlugQueryKey = [
  "getStreetMarketsByCity",
  GetStreetMarketsByCityQuery,
];

export type UseGetStreetMarketsByCityOptions = Omit<
  UseInfiniteQueryOptions<
    GetStreetMarketsByCityResponse,
    AxiosError,
    InfiniteData<GetStreetMarketsByCityResponse>,
    GetStreetMarketsByCityResponse,
    GetStreetMarketsByCitySlugQueryKey,
    number
  >,
  "queryKey" | "getNextPageParam" | "initialPageParam"
>;
