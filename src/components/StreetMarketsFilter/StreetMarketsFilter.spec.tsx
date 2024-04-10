import { customRender } from "@tests/customRender";
import { StreetMarketsFilter } from "./StreetMarketsFilter";
import { act, fireEvent, waitFor } from "@testing-library/react";

const mockHandleOnChangeNowOpen = vi.fn();
const mockHandleOnChangeWeekday = vi.fn();
const mockHandleOnSearchStreetMarket = vi.fn();

vi.mock("./useStreetMarketsFilter", () => {
  return {
    useStreetMarketsFilter: () => ({
      openNow: false,
      weekday: "",
      searchStreetMarket: "",
      isLoading: false,
      week: [
        {
          label: "Segunda-feira",
          value: "monday"
        }
      ],
      handleOnChangeNowOpen: (args: unknown) => mockHandleOnChangeNowOpen(args),
      handleOnChangeWeekday: (args: unknown) => mockHandleOnChangeWeekday(args),
      handleOnSearchStreetMarket: (args: unknown) => mockHandleOnSearchStreetMarket(args),
    })
  };
});

describe("@/components/StreetMarketsFilter", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it(`GIVEN a StreetMarketsFilter
      WHEN user clicks in "Abertas agora"
      THEN should call navigate`, async () => {
    const { getByText } = customRender(<StreetMarketsFilter />);

    await waitFor(() => {
      const openNowToggle = getByText("Abertas agora");
      act(() => {
        fireEvent.click(openNowToggle);
      });
      expect(mockHandleOnChangeNowOpen).toHaveBeenCalledTimes(1);
    });
  });

  it(`GIVEN a StreetMarketsFilter
      WHEN user clicks in "Segunda-feira"
      THEN should call navigate`, async () => {
    const { getByText } = customRender(<StreetMarketsFilter />);

    await waitFor(() => {
      const mondayToggle = getByText("Segunda-feira");
      act(() => {
        fireEvent.click(mondayToggle);
      });
      expect(mockHandleOnChangeWeekday).toHaveBeenCalledTimes(1);
    });
  });

  it(`GIVEN a StreetMarketsFilter
      WHEN type any value in input
      THEN should call navigate`, async () => {
    const { getByPlaceholderText } = customRender(<StreetMarketsFilter />);

    await waitFor(() => {
      const inputName = getByPlaceholderText("Busque uma feira pelo nome");
      act(() => {
        fireEvent.change(inputName, {
          target: {
            value: "test 1234"
          }
        });
      });

      expect(mockHandleOnSearchStreetMarket).toHaveBeenCalledTimes(1);
    });
  });
});
