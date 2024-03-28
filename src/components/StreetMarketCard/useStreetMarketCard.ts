import { Weekday } from "@/services/getStreetMarketsByCity";
import { UseStreetMarketCardProps } from "./types";

const weekdaysFormated: Record<Weekday, string> = {
  saturday: "Sábado",
  sunday: "Domingo",
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Qinita-feira",
  friday: "Sexta-feira",
};

export function useStreetMarketCard({
  apperture,
  closure,
  name,
  neighborhood,
  weekday,
}: UseStreetMarketCardProps) {
  function formatHour(hour: number): string {
    return String(hour).padStart(2, "0");
  }

  const formatedName = name.charAt(0).toUpperCase() + name.slice(1);

  const formatedNeighborhood =
    neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1);

  const timeFormated = `${formatHour(apperture)}h - ${formatHour(closure)}h`;

  const weekdayFormated = weekdaysFormated[weekday];

  return {
    formatedName,
    formatedNeighborhood,
    timeFormated,
    weekdayFormated,
  };
}
