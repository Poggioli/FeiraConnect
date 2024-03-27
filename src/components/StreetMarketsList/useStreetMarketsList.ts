import useObserveQuery from "@/hooks/useObserveQuery";
import { createGetCityBySlugQueryKey } from "@/services/getCityBySlug";
import { useGetStreetMarketsByCity } from "@/services/getStreetMarketsByCity";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";

export function useStreetMarketsList() {
  const { city } = useParams({ from: "/city/$city" });
  const { isFetching: isFetchingStreetMarkets, ...streetMarketsByCityService } =
    useGetStreetMarketsByCity({ city });
  const { isFetching: isFetchingCity } = useObserveQuery(
    createGetCityBySlugQueryKey(city)
  );

  const isFetching: boolean = useMemo(
    () => isFetchingCity || isFetchingStreetMarkets,
    [isFetchingCity, isFetchingStreetMarkets]
  );

  return {
    streetMarketsByCityService: { isFetching, ...streetMarketsByCityService },
  };
}
