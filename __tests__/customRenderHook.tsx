import { Queries, RenderHookOptions, RenderHookResult, queries, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren, useMemo } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      retryDelay: 0,
    }
  }
});

const RouterWrapper: FC<PropsWithChildren> = ({ children }) => {
  const router = useMemo(() =>
    createRouter({
      defaultComponent: () => children,
    }), [children]);

  return <RouterProvider router={router} />;
}

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <RouterWrapper>
      {children}
    </RouterWrapper>
  </QueryClientProvider>
);

export function customRenderHook<
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
): RenderHookResult<Result, Props> {
  return renderHook(render, { ...options, wrapper: Wrapper })
}