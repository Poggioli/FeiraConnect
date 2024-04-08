import { FC } from "react";
import { useHeaderStreetMarketPage } from "./useHeaderStreetMarketPage";
import { notFound } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { TitlePage } from "@/components/TitlePage";
import { Badge } from "../ui/badge";
import { MapPinned } from "lucide-react";
import { Helmet } from "react-helmet";

export const HeaderStreetMarketPage: FC = () => {

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
    <>
      <Skeleton className="min-h-10 w-32" />
      <Skeleton className="min-h-5 w-16" />
    </>
  ) : (
    <>
      <Helmet>
        <title>{data?.name} | Feira connect</title>
      </Helmet>
      <TitlePage>{data?.name}</TitlePage>
      <a
        href={data?.location}
        target="_blank"
        className="leading-[initial]"
        aria-label={`Localização da feira ${data?.name}`}
      >
        <Badge className="gap-3">
          local
          <MapPinned className="h-4 w-4" />
        </Badge>
      </a>
    </>
  );
};
