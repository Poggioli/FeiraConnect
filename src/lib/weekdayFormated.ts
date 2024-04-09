import { Weekday } from "@/services/getStreetMarketsByCity";
import { getDay, isDate } from "date-fns";

type WeekdaysAsNumber = 1 | 2 | 3 | 4 | 5 | 6 | 0;

export function weekdayFormated(
  value: Weekday | WeekdaysAsNumber | Date
): string {
  const weekdaysFormated: Record<Weekday | WeekdaysAsNumber, string> = {
    saturday: "Sábado",
    sunday: "Domingo",
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado",
    0: "Domingo",
  };

  const index: Weekday | WeekdaysAsNumber = isDate(value)
    ? (getDay(value) as WeekdaysAsNumber)
    : value;

  return weekdaysFormated[index];
}
