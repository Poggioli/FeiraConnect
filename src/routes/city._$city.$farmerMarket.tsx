import { FarmerMarketLoading } from '@/components/FarmerMarketLoading';
import { useSearchFarmerMarketBySlug } from '@/services/searchFarmerMarketBySlug';
import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet';

export const Route = createFileRoute('/city/_$city/$farmerMarket')({
  component: CityNeighborhood,
})

function CityNeighborhood() {
  const { farmerMarket } = Route.useParams();
  const { isLoading, data, isSuccess, isError } = useSearchFarmerMarketBySlug(farmerMarket);

  return isLoading ? (
    <FarmerMarketLoading />
  ) : (
    <>
      {isSuccess ? (
        <>
          <Helmet>
            <title>{data.name} | Feira Connect</title>
          </Helmet>
          <div className="p-6 md:p-12 min-h-full w-full flex flex-col gap-4 items-start max-w-screen-xlg m-auto" >
            <h1 className='text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>{data.name}</h1>
          </div>
        </>
      ) : null}
      {isError ? (
        <p>Erro</p>
      ) : null}
    </>
  )
}