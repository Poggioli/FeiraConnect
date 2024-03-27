import { TitlePage } from "@/components/TitlePage";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "@tanstack/react-router";
import { FC } from "react";
import { useHeaderCityPage } from "./useHeaderCityPage";

export const HeaderCityPage: FC = () => {

  const {
    cityService: {
      isFetching,
      error,
      data,
    }
  } = useHeaderCityPage();

  if (error && error.response?.status === 404) {
    throw notFound({ routeId: '/city/$city' })
  }

  return isFetching ? (
    <Skeleton className="min-h-10 w-32" />
  ) : (
    <TitlePage>{data?.name}</TitlePage>
  );
};
