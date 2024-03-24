import { HomeSearchBar } from "@/components/HomeSearchBar";
import { TitlePage } from "@/components/TitlePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateSearch: (search: Record<string, any>): { q?: string } => ({
    q: search.q || ""
  })
})

function Index() {
  return (
    <div className="p-6 md:p-12 h-full w-full flex flex-col gap-4 justify-center items-center max-w-screen-md m-auto">
      <TitlePage>Vamos a feira</TitlePage>
      <HomeSearchBar />
    </div>
  )
}