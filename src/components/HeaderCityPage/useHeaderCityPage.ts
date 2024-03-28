import {
  createGetCityBySlugQueryKey,
  useGetCityBySlug,
} from "@/services/getCityBySlug";
import { useParams } from "@tanstack/react-router";

export function useHeaderCityPage() {
  const { city } = useParams({ from: "/city/$city" });
  const cityService = useGetCityBySlug({
    queryKey: createGetCityBySlugQueryKey(city),
  });

  return {
    cityService,
  };
}
