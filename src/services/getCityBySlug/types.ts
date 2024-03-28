import { GetCities } from "@/services/getCities";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseGetCityBySlug = GetCities;

export type UseGetCityBySlugQueryKey = ["getCityBySlug", string];

export type UseGetCityBySlugOptions = UndefinedInitialDataOptions<
  UseGetCityBySlug,
  AxiosError,
  UseGetCityBySlug,
  UseGetCityBySlugQueryKey
>;
