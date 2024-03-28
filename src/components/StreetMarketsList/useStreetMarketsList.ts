import { createGetCityBySlugQueryKey } from "@/services/getCityBySlug";
import { useGetStreetMarketsByCity } from "@/services/getStreetMarketsByCity";
import { useIsFetching } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";

export function useStreetMarketsList() {
  const { city } = useParams({ from: "/city/$city" });
  const { isLoading: isLoadingStreetMarkets, ...streetMarketsByCityService } =
    useGetStreetMarketsByCity({ city });
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
