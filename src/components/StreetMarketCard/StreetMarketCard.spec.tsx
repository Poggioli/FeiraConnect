import { customRender } from "@tests/customRender";
import { StreetMarketCard, StreetMarketCardSkeleton } from "./StreetMarketCard";
import { StreetMarketCardProps } from "./types";
import { waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";

describe('@/components/StreetMarketCard', () => {

  const defaultValue: StreetMarketCardProps = {
    id: '1',
    slug: 'name-name',
    apperture: 9,
    closure: 15,
    name: "name name",
    neighborhood: "neighborhood",
    weekday: "saturday",
    location: ''
  };

  it(`GIVEN a StreetMarketCard component
      WHEN render
      THEN should match with snapshot`, async () => {
    const { baseElement, getByText } = customRender(<StreetMarketCard {...defaultValue} />);

    await waitFor(() => {
      const streetMarketName = getByText("Name name");
      expect(streetMarketName).toBeVisible();
      expect(baseElement).toMatchSnapshot();
    })
  });

  it(`GIVEN a StreetMarketCardSkeleton component
      WHEN render
      THEN should match with snapshot`, () => {
    const { baseElement } = render(<StreetMarketCardSkeleton />);
    expect(baseElement).toMatchSnapshot();
  });
});