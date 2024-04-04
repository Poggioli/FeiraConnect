import { render } from "@testing-library/react";
import { PageNotFound } from "./PageNotFound";

describe('@/components/PageNotFound', () => {
  it(`GIVEN a PageNotFound component
      WHEN render
      THEN should show message`, () => {
    const { getByText } = render(<PageNotFound />);

    const notFoundCode = getByText("404.");
    const errorMessage = getByText("Ocorreu um erro");
    const message = getByText("Você esta tentando acessar algo que não encontramos no nosso servidor.");
    const conclusionMessage = getByText("Isso é tudo o que sabemos.");

    expect(notFoundCode).toBeVisible();
    expect(errorMessage).toBeVisible();
    expect(message).toBeVisible();
    expect(conclusionMessage).toBeVisible();
  });
});