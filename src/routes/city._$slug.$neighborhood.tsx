import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/city/_$slug/$neighborhood')({
  component: CityNeighborhood,
})

function CityNeighborhood() {

  const { neighborhood, slug } = Route.useParams();

  return <h1 className='text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>{neighborhood}/{slug}</h1>
}