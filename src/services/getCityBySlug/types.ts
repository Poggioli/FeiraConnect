import { UndefinedInitialDataOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetCities } from "@/services/getCities";

export type UseGetCityBySlug = GetCities;

export type UseGetCityBySlugQueryKey = ["getCityBySlug", string]

export type UseGetCityBySlugOptions = UndefinedInitialDataOptions<
  UseGetCityBySlug,
  AxiosError,
  UseGetCityBySlug,
  UseGetCityBySlugQueryKey
>;
