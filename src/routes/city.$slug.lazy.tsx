import { CitySlugLoading } from '@/components/CitySlugLoading';
import { useSearchCityBySlug } from '@/services/searchCityBySlug';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/city/$slug')({
  component: City,
})

function City() {

  const { slug } = Route.useParams();
  const { isLoading, data, isSuccess, isError } = useSearchCityBySlug(slug);

  return isLoading ? (
    <CitySlugLoading />
  ) : (
    <>
      {isSuccess ? (
        <div className="p-6 md:p-12 h-full w-full flex flex-col gap-4 items-start max-w-screen-lg m-auto" >
          <h1 className='text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>{data?.name}</h1>
        </div>
      ) : null}
      {isError ? (
        <p>Erro</p>
      ) : null}
    </>
  )
}