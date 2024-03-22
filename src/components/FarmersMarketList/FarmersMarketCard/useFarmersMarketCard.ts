import { Frequency } from "@/services/searchStreetMarketByCitySlug";
import { getHours } from "date-fns";
import { UseFarmersMarketCardProps } from "./types";

const frequencyToWeekDay: Record<Frequency, string> = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

export function useFarmersMarketCard({
  frequency,
  startTime,
  endTime,
}: UseFarmersMarketCardProps) {
  const weekDay = frequencyToWeekDay[frequency];
  const workHour = `${getHours(startTime)}h - ${getHours(endTime)}h`;

  return {
    weekDay,
    workHour,
  };
}
