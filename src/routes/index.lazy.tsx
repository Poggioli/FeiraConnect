import { IndexSearchBar } from '@/components/IndexSearchBar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-4 md:p-8 h-full w-full flex flex-col gap-4 justify-center items-center max-w-screen-md m-auto">
      <h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>Vamos para feira?!</h1>
      <IndexSearchBar />
    </div>
  )
}