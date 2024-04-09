import { capitalizeString } from "@/lib/capitalizeString";
import { UseStreetMarketCardProps } from "./types";
import { weekdayFormated } from "@/lib/weekdayFormated";

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

  const formatedName = capitalizeString(name);
  const formatedNeighborhood = capitalizeString(neighborhood);
  const timeFormated = `${formatHour(apperture)}h - ${formatHour(closure)}h`;
  const wf = weekdayFormated(weekday);

  return {
    formatedName,
    formatedNeighborhood,
    timeFormated,
    weekdayFormated: wf,
  };
}
