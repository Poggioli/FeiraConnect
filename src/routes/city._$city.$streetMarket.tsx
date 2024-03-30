import { HeaderStreetMarketPage } from "@/components/HeaderStreetMarketPage";
import { PageNotFound } from "@/components/PageNotFound";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/city/_$city/$streetMarket")({
  component: StreetMarket,
  notFoundComponent: () => <PageNotFound />
})

function StreetMarket() {

  return (
    <div className="p-6 md:p-12 h-full w-full flex flex-col gap-4 justify-start items-start max-w-screen-lg m-auto">
      <HeaderStreetMarketPage />
    </div>
  )
}