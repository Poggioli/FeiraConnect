import { Queries, RenderHookOptions, RenderHookResult, queries, renderHook } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import { QueryClientProviderWrapper } from "./QueryClientProviderWrapper";

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProviderWrapper>
      {children}
  </QueryClientProviderWrapper>
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