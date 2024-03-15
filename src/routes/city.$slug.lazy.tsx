import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/city/$slug')({
  component: City,
})

function City() {

  const { slug } = Route.useParams()

  return (
    <div className="p-6 md:p-12 h-full w-full flex flex-col gap-4 justify-center items-center max-w-screen-md m-auto">
      <h1 className='text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>Cidade {slug}</h1>
    </div>
  )
}