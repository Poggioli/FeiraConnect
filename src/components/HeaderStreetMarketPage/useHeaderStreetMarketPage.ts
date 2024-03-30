import { createGetStreetMarketBySlugQueryKey, useGetStreetMarketBySlug } from "@/services/getStreetMarketBySlug";
import { useParams } from "@tanstack/react-router";

export function useHeaderStreetMarketPage() {
  const { streetMarket } = useParams({ from: "/city/_$city/$streetMarket" });
  const streetMarketService = useGetStreetMarketBySlug({
    queryKey: createGetStreetMarketBySlugQueryKey(streetMarket),
  });

  return {
    streetMarketService,
  };
}
