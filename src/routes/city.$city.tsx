import { CitySlugLoading } from '@/components/CitySlugLoading';
import { FarmersMarketList } from '@/components/FarmersMarketList';
import { useSearchCityBySlug } from '@/services/searchCityBySlug';
import { Frequency } from '@/services/searchFarmersMarketByCityId';
import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet';

export const Route = createFileRoute('/city/$city')({
  component: City,
  validateSearch: (search: Record<string, unknown>): { workingNow?: boolean, frequency?: Frequency } => ({
    ...(search.workingNow === false || search.workingNow === true ? { workingNow: search.workingNow } : {}),
    ...(search.frequency ? { frequency: search.frequency as Frequency } : {})
  })
})

function City() {

  const { city } = Route.useParams();
  const { isLoading, data, isSuccess, isError } = useSearchCityBySlug(city);

  return isLoading ? (
    <CitySlugLoading />
  ) : (
    <>
      {isSuccess ? (
        <>
          <Helmet>
            <title>Feiras em {data.name} | Feira Connect</title>
          </Helmet>
          <div className="p-6 md:p-12 min-h-full w-full flex flex-col gap-4 items-start max-w-screen-xlg m-auto" >
            <h1 className='text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>{data.name}</h1>
            <FarmersMarketList city={data.id} />
          </div>
        </>
      ) : null}
      {isError ? (
        <p>Erro</p>
      ) : null}
    </>
  )
}