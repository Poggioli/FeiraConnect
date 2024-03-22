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

export type SearchStreetMarketByCitySlug = {
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

export type SearchStreetMarketByCitySlugParams = PaginationRequest & {
  query: {
    city: string;
    frequency?: Frequency;
    hour?: number;
  };
};

export type SearchStreetMarketByCitySlugResponse =
  PaginationResponse<SearchStreetMarketByCitySlug>;

export type UseSearchStreetMarketByCitySlugOptions = Omit<
  UseInfiniteQueryOptions<
    SearchStreetMarketByCitySlugResponse,
    AxiosError,
    InfiniteData<SearchStreetMarketByCitySlugResponse>,
    SearchStreetMarketByCitySlugResponse,
    [
      "searchStreetMarketByCitySlug",
      string,
      Frequency | undefined,
      number | undefined,
    ],
    number
  >,
  "queryKey" | "getNextPageParam" | "initialPageParam"
>;
