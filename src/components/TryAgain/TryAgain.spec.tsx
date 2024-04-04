import { act, fireEvent, render } from "@testing-library/react";
import { TryAgain } from "./TryAgain";

describe('@/components/TryAgain', () => {
  it(`GIVEN a TryAgain component
      WHEN render
      THEN should show a message
      AND a button to try again`, () => {
    const { getByText } = render(<TryAgain refetch={() => null} />);

    const message = getByText("Ocorreu um erro ao obter os dados. Tente novamente mais tarde.");
    const tryAgainButton = getByText("Tentar novamente");

    expect(message).toBeVisible();
    expect(tryAgainButton).toBeVisible();
  })

  it(`GIVEN a TryAgain component
      WHEN user click in try again button
      THEN should call refetch function`, () => {
    const refetchMock = vi.fn();
    const { getByText } = render(<TryAgain refetch={refetchMock} />);

    const tryAgainButton = getByText("Tentar novamente");

    act(() => {
      fireEvent.click(tryAgainButton);
    });

    expect(refetchMock).toHaveBeenCalledTimes(1);
  })
})