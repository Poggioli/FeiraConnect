import { UndefinedInitialDataOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseSearchFarmerMarketBySlug = {
  id: string;
  name: string;
  slug: string;
  location: {
    lat: number;
    long: number;
  };
};

export type UseSearchFarmerMarketBySlugOptions = UndefinedInitialDataOptions<
  UseSearchFarmerMarketBySlug,
  AxiosError,
  UseSearchFarmerMarketBySlug,
  ["searchFarmerMarketBySlug", { slug: string }]
>;
