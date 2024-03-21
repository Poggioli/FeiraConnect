import { getWeekDay, isValidFrequency } from "@/lib/utils";
import {
  Frequency,
  useSearchFarmersMarketByCitySlug,
} from "@/services/searchFarmersMarketByCitySlug";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { getHours } from "date-fns";
import { useMemo } from "react";
import { UseFarmersMarketListProps } from "./types";

export function useFarmersMarketList({ slug }: UseFarmersMarketListProps) {
  const navigate = useNavigate();
  const { frequency, workingNow } = useSearch({
    from: "/city/$slug",
  });

  const hour: number | undefined = useMemo(() => {
    return workingNow ? getHours(new Date()) : undefined;
  }, [workingNow]);

  const weekDay: Frequency | undefined = useMemo(() => {
    if (isValidFrequency(frequency)) {
      return frequency;
    }

    return workingNow ? getWeekDay() : undefined;
  }, [workingNow, frequency]);

  const service = useSearchFarmersMarketByCitySlug({
    query: { city: slug, frequency: weekDay, hour },
  });

  function changeSearchParams({
    frequency,
    workingNow,
  }: {
    frequency: Frequency | undefined;
    workingNow: true | undefined;
  }): void {
    navigate({
      search: {
        frequency,
        workingNow,
      },
      replace: true,
    });
  }

  function handleOnCheckedChange(value: boolean): void {
    if (value) {
      changeSearchParams({ frequency: undefined, workingNow: true });
      return;
    }

    changeSearchParams({ frequency: undefined, workingNow: undefined });
  }

  function handleOnFrequencyChange(value: string): void {
    if (value) {
      changeSearchParams({
        frequency: value as Frequency,
        workingNow: undefined,
      });
      return;
    }

    changeSearchParams({ frequency: undefined, workingNow: undefined });
  }

  return {
    service,
    workingNow: !!workingNow,
    frequency: weekDay,
    handleOnCheckedChange,
    handleOnFrequencyChange,
  };
}
