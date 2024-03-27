import { GetStreetMarketsByCity } from "@/services/getStreetMarketsByCity";

export type StreetMarketCardProps = GetStreetMarketsByCity;

export type UseStreetMarketCardProps = Pick<
  StreetMarketCardProps,
  "name" | "neighborhood" | "weekday" | "apperture" | "closure"
>;
