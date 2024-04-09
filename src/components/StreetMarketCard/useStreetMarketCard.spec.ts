import { customRenderHook } from "@tests/customRenderHook";
import { UseStreetMarketCardProps } from "./types";
import { useStreetMarketCard } from "./useStreetMarketCard";

describe("@/components/useStreetMarketCard", () => {
  const defaultValue: UseStreetMarketCardProps = {
    apperture: 9,
    closure: 15,
    name: "name name",
    neighborhood: "neighborhood",
    weekday: "saturday",
  };

  it(`GIVEN a useStreetMarketCard
      WHEN call with non capitalized name
      THEN should return name formated`, () => {
    const {
      result: {
        current: { formatedName },
      },
    } = customRenderHook(() => useStreetMarketCard(defaultValue));

    expect(formatedName).toBe("Name name");
  });

  it(`GIVEN a useStreetMarketCard
      WHEN call with non capitalized neighborhood
      THEN should return neighborhood formated`, () => {
    const {
      result: {
        current: { formatedNeighborhood },
      },
    } = customRenderHook(() => useStreetMarketCard(defaultValue));
    expect(formatedNeighborhood).toBe("Neighborhood");
  });

  it(`GIVEN a useStreetMarketCard
      WHEN call with apperture and closure
      THEN should return formated time`, () => {
    const {
      result: {
        current: { timeFormated },
      },
    } = customRenderHook(() => useStreetMarketCard(defaultValue));
    expect(timeFormated).toBe("09h - 15h");
  });

  it(`GIVEN a useStreetMarketCard
      WHEN call with weekday
      THEN should return weekday formated`, () => {
    const {
      result: {
        current: { weekdayFormated },
      },
    } = customRenderHook(() => useStreetMarketCard(defaultValue));
    expect(weekdayFormated).toBe("Sábado");
  });
});
