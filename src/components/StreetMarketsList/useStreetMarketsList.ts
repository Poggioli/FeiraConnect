import { createGetCityBySlugQueryKey } from "@/services/getCityBySlug";
import { useGetStreetMarketsByCity } from "@/services/getStreetMarketsByCity";
import { useIsFetching } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import { getHours } from "date-fns";

export function useStreetMarketsList() {
  const { city } = useParams({ from: "/city/$city" });
  const { open, wd, smq } = useSearch({ from: "/city/$city" });
  const currentHour: number | undefined = open
    ? getHours(new Date())
    : undefined;

  const { isLoading: isLoadingStreetMarkets, ...streetMarketsByCityService } =
    useGetStreetMarketsByCity({ city, hour: currentHour, weekday: wd, searchTerm: smq });
  const isLoadingCity = useIsFetching({
    queryKey: createGetCityBySlugQueryKey(city),
  });

  const isLoading: boolean = useMemo(
    () => !!isLoadingCity || isLoadingStreetMarkets,
    [isLoadingStreetMarkets, isLoadingCity]
  );

  return {
    streetMarketsByCityService: { ...streetMarketsByCityService, isLoading },
  };
}
