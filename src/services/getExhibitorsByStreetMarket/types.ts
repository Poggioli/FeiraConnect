import { PaginationRequest, PaginationResponse } from "@/services/api";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type GetExhibitorsByStreetMarket = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  whatsApp?: string;
  website?: string;
  phone: string;
  items: string[];
};

export type GetExhibitorsByStreetMarketQuery = {
  streetMarket: string;
  searchTerm?: string;
};

export type GetExhibitorsByStreetMarketParams = PaginationRequest & GetExhibitorsByStreetMarketQuery;

export type GetExhibitorsByStreetMarketQueryKey = [
  "getExhibitorsByStreetMarket",
  GetExhibitorsByStreetMarketQuery,
];

export type GetExhibitorsByStreetMarketResponse = PaginationResponse<GetExhibitorsByStreetMarket>;

export type UseGetExhibitorsByStreetMarketOptions = Omit<
  UseInfiniteQueryOptions<
    GetExhibitorsByStreetMarketResponse,
    AxiosError,
    InfiniteData<GetExhibitorsByStreetMarketResponse>,
    GetExhibitorsByStreetMarketResponse,
    GetExhibitorsByStreetMarketQueryKey,
    number
  >,
  "queryKey" | "getNextPageParam" | "initialPageParam"
>;
