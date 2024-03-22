import { Frequency, SearchFarmersMarketByCitySlug } from "@/services/searchStreetMarketByCitySlug";

export type FarmersMarketCardProps = SearchFarmersMarketByCitySlug

export type UseFarmersMarketCardProps = {
  frequency: Frequency,
  startTime: Date,
  endTime: Date
}