import { Queries, RenderOptions, RenderResult, queries, render } from "@testing-library/react";
import React, { FC, PropsWithChildren } from "react";
import { QueryClientProviderWrapper } from './QueryClientProviderWrapper';
import { RouterWrapper } from './RouterWrapper';

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProviderWrapper>
    <RouterWrapper>
      {children}
    </RouterWrapper>
  </QueryClientProviderWrapper>
);

export function customRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: React.ReactNode,
  options?: RenderOptions<Q, Container, BaseElement>,
): RenderResult<Q, Container, BaseElement> {
  return render(ui, { ...options, wrapper: Wrapper })
}
