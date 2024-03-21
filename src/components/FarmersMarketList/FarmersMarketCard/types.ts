import { Frequency, SearchFarmersMarketByCityId } from "@/services/searchFarmersMarketByCityId";

export type FarmersMarketCardProps = SearchFarmersMarketByCityId

export type UseFarmersMarketCardProps = {
  frequency: Frequency,
  startTime: Date,
  endTime: Date
}