import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {import.meta.env.VITE_LOCAL_ENV ? (
        <TanStackRouterDevtools />
      ) : null}
    </>
  ),
})