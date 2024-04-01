import { useGetExhibitorsByStreetMarket } from "@/services/getExhibitorsByStreetMarket";
import { createGetStreetMarketBySlugQueryKey } from "@/services/getStreetMarketBySlug";
import { useIsFetching } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";

export function useExhibitorsList() {
  const { streetMarket } = useParams({ from: "/city/_$city/$streetMarket" });
  const isLoadingStreetMarket = useIsFetching({
    queryKey: createGetStreetMarketBySlugQueryKey(streetMarket),
  });

  const { isLoading: isLoadingExhibitors, ...exhibitorsByStreetMarketService } =
    useGetExhibitorsByStreetMarket({ streetMarket });

  const isLoading: boolean = useMemo(
    () => !!isLoadingStreetMarket || isLoadingExhibitors,
    [isLoadingExhibitors, isLoadingStreetMarket]
  );

  return {
    exhibitorsByStreetMarketService: {
      isLoading,
      ...exhibitorsByStreetMarketService,
    },
  };
}
