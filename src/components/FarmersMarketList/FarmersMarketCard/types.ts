import { Frequency, SearchFarmersMarketByCitySlug } from "@/services/searchFarmersMarketByCitySlug";

export type FarmersMarketCardProps = SearchFarmersMarketByCitySlug

export type UseFarmersMarketCardProps = {
  frequency: Frequency,
  startTime: Date,
  endTime: Date
}