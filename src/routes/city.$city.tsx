import { HeaderCityPage } from "@/components/HeaderCityPage";
import { PageNotFound } from "@/components/PageNotFound";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/city/$city")({
  component: City,
  notFoundComponent: PageNotFound
})

function City() {
  return (
    <div className="p-6 md:p-12 h-full w-full flex flex-col gap-4 justify-start items-start max-w-screen-lg m-auto">
      <HeaderCityPage />
    </div>
  )
}