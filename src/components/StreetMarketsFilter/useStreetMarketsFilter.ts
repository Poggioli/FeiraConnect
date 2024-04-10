import { createGetCityBySlugQueryKey } from "@/services/getCityBySlug";
import { Weekday } from "@/services/getStreetMarketsByCity";
import { useIsFetching } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { weekdayFormated } from "@/lib/weekdayFormated";

export function useStreetMarketsFilter() {
  const { city } = useParams({ from: "/city/$city" });
  const { open, wd, smq } = useSearch({ from: "/city/$city" });
  const navigate = useNavigate();
  const [streetMarketQuery, setStreetMarketQuery] = useState(smq || "");
  const debouncedStreetMarketQuery = useDebounce(streetMarketQuery, 800);
  const week = [
    {
      value: "sunday",
      label: weekdayFormated("sunday"),
    },
    {
      value: "monday",
      label: weekdayFormated("monday"),
    },
    {
      value: "tuesday",
      label: weekdayFormated("tuesday"),
    },
    {
      value: "wednesday",
      label: weekdayFormated("wednesday"),
    },
    {
      value: "thursday",
      label: weekdayFormated("thursday"),
    },
    {
      value: "friday",
      label: weekdayFormated("friday"),
    },
    {
      value: "saturday",
      label: weekdayFormated("saturday"),
    },
  ];
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
    streetMarketSearch,
  }: {
    isNowOpen?: boolean;
    weekDay?: Weekday;
    streetMarketSearch?: string;
  }): void {
    navigate({
      from: "/city/$city",
      search: {
        open: isNowOpen,
        wd: weekDay,
        smq: streetMarketSearch || undefined,
      },
    });
  }

  function handleOnChangeNowOpen(value: boolean): void {
    if (value) {
      onNavigate({
        isNowOpen: true,
        weekDay: getWeekday(),
        streetMarketSearch: smq,
      });
    } else {
      onNavigate({ streetMarketSearch: smq });
    }
  }

  function handleOnChangeWeekday(value: string): void {
    if (value) {
      onNavigate({ weekDay: value as Weekday, streetMarketSearch: smq });
    } else {
      onNavigate({ streetMarketSearch: smq });
    }
  }

  function handleOnSearchStreetMarket(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    const { value } = event.target;
    setStreetMarketQuery(value);
  }

  useEffect(() => {
    onNavigate({
      isNowOpen: open,
      weekDay: wd,
      streetMarketSearch: debouncedStreetMarketQuery,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedStreetMarketQuery]);

  return {
    weekday: open ? getWeekday() : wd || "",
    openNow: !!open,
    searchStreetMarket: streetMarketQuery,
    handleOnChangeNowOpen,
    handleOnChangeWeekday,
    handleOnSearchStreetMarket,
    isLoading: !!isLoadingCity,
    week,
  };
}
