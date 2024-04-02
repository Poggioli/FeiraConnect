import { GetExhibitorsByStreetMarket } from "@/services/getExhibitorsByStreetMarket";

export type ExhibitorCardProps = GetExhibitorsByStreetMarket;

export type UseExhibitorCardPropsProps = Pick<ExhibitorCardProps, "name" | "phone" | "whatsApp" | "website">;
