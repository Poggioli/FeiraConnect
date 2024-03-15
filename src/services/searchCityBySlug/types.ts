import { UndefinedInitialDataOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseSearchCityBySlug = {
  id: string;
  name: string;
  slug: string;
};

export type UseSearchCityBySlugOptions = UndefinedInitialDataOptions<
  UseSearchCityBySlug,
  AxiosError,
  UseSearchCityBySlug,
  ["searchCityBySlug", { slug: string }]
>;
