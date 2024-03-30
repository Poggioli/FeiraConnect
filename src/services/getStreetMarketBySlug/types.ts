import { UndefinedInitialDataOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetStreetMarketsByCity } from "@/services/getStreetMarketsByCity";

export type UseGetStreetMarketBySlug = GetStreetMarketsByCity

export type UseGetStreetMarketBySlugQueryKey = ["getStreetMarketBySlug", string];

export type UseGetStreetMarketBySlugOptions = UndefinedInitialDataOptions<
  UseGetStreetMarketBySlug,
  AxiosError,
  UseGetStreetMarketBySlug,
  UseGetStreetMarketBySlugQueryKey
>
