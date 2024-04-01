import { HeaderCityPage } from "@/components/HeaderCityPage";
import { PageNotFound } from "@/components/PageNotFound";
import { StreetMarketsList } from "@/components/StreetMarketsList";
import { Weekday } from "@/services/getStreetMarketsByCity";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/city/$city")({
  component: City,
  notFoundComponent: () => <PageNotFound />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateSearch: (search: Record<string, any>): { wd?: Weekday, open?: boolean, smq?: string } => ({
    wd: search.wd,
    open: search.open,
    smq: search.smq
  })
})

function City() {
  return (
    <div className="p-6 md:p-12 h-full w-full flex flex-col gap-4 justify-start items-start max-w-screen-lg m-auto">
      <HeaderCityPage />
      <StreetMarketsList />
    </div>
  )
}