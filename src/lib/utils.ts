import { Frequency } from "@/services/searchFarmersMarketByCitySlug";
import { clsx, type ClassValue } from "clsx";
import { getDay } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeekDay(): Frequency {
  const days: Record<number, Frequency> = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    7: "sunday",
  };

  const today = new Date();
  return days[getDay(today)];
}

export function isValidFrequency(value: string | undefined): boolean {
  const frequencys: Frequency[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return frequencys.some((frequency) => frequency === value)
}
