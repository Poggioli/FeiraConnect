import { PaginationRequest, PaginationResponse } from "@/services/api";

export type SearchCityByName = {
  id: string;
  slug: string;
  name: string;
};

export type SearchCityByNameParams = {
  query: string;
} & PaginationRequest

export type SearchCityByNameResponse = PaginationResponse<SearchCityByName>