import { FC } from "react";
import { HeaderStreetMarketPageProps } from "./types";
import { useHeaderStreetMarketPage } from "./useHeaderStreetMarketPage";
import { notFound } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { TitlePage } from "@/components/TitlePage";

export const HeaderStreetMarketPage: FC<HeaderStreetMarketPageProps> = () => {

  const {
    streetMarketService: {
      isFetching,
      error,
      data,
    }
  } = useHeaderStreetMarketPage();

  if (error && error.response?.status === 404) {
    throw notFound({ routeId: '/city/_$city/$streetMarket' })
  }

  return isFetching ? (
    <Skeleton className="min-h-10 w-32" />
  ) : (
    <TitlePage>{data?.name}</TitlePage>
  );
};
