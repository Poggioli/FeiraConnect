import { render } from "@testing-library/react";
import { EmptyResponse } from "./EmptyResponse";

describe('@/components/EmptyResponse', () => {
  it(`GIVEN a EmptyResponse
      WHEN message DONT have children
      THEN should render default message`, () => {
    const { getByText } = render(
      <EmptyResponse.Container>
        <EmptyResponse.Image />
        <EmptyResponse.Message />
      </EmptyResponse.Container>
    );

    const message = getByText('Não encontramos nada por aqui...');
    expect(message).toBeVisible();
  });

  it(`GIVEN a EmptyResponse
      WHEN message have children
      THEN should render children
      AND NOT render default message`, () => {
    const { getByText, queryByText } = render(
      <EmptyResponse.Container>
        <EmptyResponse.Image />
        <EmptyResponse.Message>Custom message</EmptyResponse.Message>
      </EmptyResponse.Container>
    );

    const defaultMessage = queryByText('Não encontramos nada por aqui...');
    const customMessage = getByText('Custom message');
    
    expect(customMessage).toBeVisible();
    expect(defaultMessage).not.toBeInTheDocument();
  });
})