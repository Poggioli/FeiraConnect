import { render } from "@testing-library/react";
import { TitlePage } from "./TitlePage";

describe('@/components/TitlePage', () => {
  it(`GIVEN a TitlePage component
      WHEN render
      THEN should render the children element`, () => {
    const { getByText } = render(<TitlePage >Test</TitlePage>);

    const message = getByText("Test");

    expect(message).toBeVisible();
  });
});