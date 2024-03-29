import { createGetCityBySlugQueryKey } from "@/services/getCityBySlug";
import { Weekday } from "@/services/getStreetMarketsByCity";
import { useIsFetching } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export function useStreetMarketsFilter() {
  const { city } = useParams({ from: "/city/$city" });
  const { open, wd } = useSearch({ from: "/city/$city" });
  const navigate = useNavigate();

  const isLoadingCity = useIsFetching({
    queryKey: createGetCityBySlugQueryKey(city),
  });

  function getWeekday(): Weekday {
    return format(new Date(), "EEEE", {
      locale: enUS,
    }).toLocaleLowerCase() as Weekday;
  }

  function onNavigate({
    isNowOpen,
    weekDay,
  }: {
    isNowOpen?: boolean;
    weekDay?: Weekday;
  }): void {
    navigate({
      from: "/city/$city",
      search: {
        open: isNowOpen,
        wd: weekDay,
      }
    });
  }

  function handleOnChangeNowOpen(value: boolean): void {
    if (value) {
      onNavigate({ isNowOpen: true, weekDay: getWeekday() });
    } else {
      onNavigate({});
    }
  }

  function handleOnChangeWeekday(value: string): void {
    if (value) {
      onNavigate({ weekDay: value as Weekday });
    } else {
      onNavigate({});
    }
  }

  return {
    weekday: wd || "",
    openNow: !!open,
    handleOnChangeNowOpen,
    handleOnChangeWeekday,
    isLoading: isLoadingCity,
  };
}
