import { customRenderHook } from "@tests/customRenderHook";
import { useStreetMarketsFilter } from "./useStreetMarketsFilter";
import { act } from "@testing-library/react";
import { ChangeEvent } from "react";

const mockUseParams = vi.fn();
const mockUseSearch = vi.fn();
const mockUseNavigate = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useNavigate: () => mockUseNavigate,
    useSearch: (args: unknown) => mockUseSearch(args),
    useParams: (args: unknown) => mockUseParams(args),
  };
});

describe("@/components/useStreetMarketsFilter", () => {
  beforeAll(() => {
    vi.useFakeTimers({
      now: new Date(2024, 3, 9),
    });
  });

  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ city: "example-city" });
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it(`GIVEN a call to useStreetMarketsFilter
      WHEN search params is filled
      THEN should render weekday with search value
      AND openNow with value
      AND searchStreetMarket with value`, () => {
    mockUseSearch.mockReturnValue({
      open: true,
      wd: "tuesday",
      smq: "test",
    });

    const {
      result: {
        current: { weekday, openNow, searchStreetMarket },
      },
    } = customRenderHook(() => useStreetMarketsFilter());

    expect(weekday).toBe("tuesday");
    expect(openNow).toBe(true);
    expect(searchStreetMarket).toBe("test");
  });

  it(`GIVEN a call to useStreetMarketsFilter
      WHEN open in search params is true
      THEN should render weekday with the value from today`, () => {
    mockUseSearch.mockReturnValue({
      open: true,
      wd: "sunday",
      smq: "test",
    });

    const {
      result: {
        current: { weekday, openNow, searchStreetMarket },
      },
    } = customRenderHook(() => useStreetMarketsFilter());

    expect(weekday).toBe("tuesday");
    expect(openNow).toBe(true);
    expect(searchStreetMarket).toBe("test");
  });

  it(`GIVEN a call to useStreetMarketsFilter
      WHEN render this hook
      THEN week should have all days of week`, () => {
    mockUseSearch.mockReturnValue({});
    const {
      result: {
        current: { week },
      },
    } = customRenderHook(() => useStreetMarketsFilter());

    expect(week).toStrictEqual([
      { value: "sunday", label: "Domingo" },
      { value: "monday", label: "Segunda-feira" },
      { value: "tuesday", label: "Terça-feira" },
      { value: "wednesday", label: "Quarta-feira" },
      { value: "thursday", label: "Quinta-feira" },
      { value: "friday", label: "Sexta-feira" },
      { value: "saturday", label: "Sábado" },
    ]);
  });

  describe("handleOnChangeNowOpen", () => {
    it(`GIVEN a call to handleOnChangeNowOpen
        WHEN value is true
        THEN should call navigate with open equal to true
        AND weekDay equal to day of the week
        AND smq with current value of smq`, () => {
      mockUseSearch.mockReturnValue({});
      const {
        result: {
          current: {
            handleOnChangeNowOpen,
            weekday,
            openNow,
            searchStreetMarket,
          },
        },
        rerender,
      } = customRenderHook(() => useStreetMarketsFilter());

      expect(weekday).toBe("");
      expect(openNow).toBe(false);
      expect(searchStreetMarket).toBe("");

      act(() => {
        handleOnChangeNowOpen(true);
      });

      rerender();
      expect(mockUseNavigate).toHaveBeenCalledTimes(2);
      expect(mockUseNavigate).toHaveBeenNthCalledWith(2, {
        from: "/city/$city",
        search: {
          open: true,
          wd: "tuesday",
          smq: undefined,
        },
      });
    });

    it(`GIVEN a call to handleOnChangeNowOpen
        WHEN value is false
        THEN should call navigate with smq current value of smq`, () => {
      mockUseSearch.mockReturnValue({
        open: true,
        wd: "tuesday",
        smq: "test",
      });
      const {
        result: {
          current: {
            handleOnChangeNowOpen,
            weekday,
            openNow,
            searchStreetMarket,
          },
        },
        rerender,
      } = customRenderHook(() => useStreetMarketsFilter());

      expect(weekday).toBe("tuesday");
      expect(openNow).toBe(true);
      expect(searchStreetMarket).toBe("test");

      act(() => {
        handleOnChangeNowOpen(false);
      });

      rerender();
      expect(mockUseNavigate).toHaveBeenCalledTimes(2);
      expect(mockUseNavigate).toHaveBeenNthCalledWith(2, {
        from: "/city/$city",
        search: {
          open: undefined,
          wd: undefined,
          smq: "test",
        },
      });
    });
  });

  describe("handleOnChangeWeekday", () => {
    it(`GIVEN a call to handleOnChangeWeekday
        WHEN value is truthy
        THEN should call navigate with weekDay equal to selected day of week
        AND smq with current value of smq`, () => {
      mockUseSearch.mockReturnValue({});
      const {
        result: {
          current: {
            handleOnChangeWeekday,
            weekday,
            openNow,
            searchStreetMarket,
          },
        },
        rerender,
      } = customRenderHook(() => useStreetMarketsFilter());

      expect(weekday).toBe("");
      expect(openNow).toBe(false);
      expect(searchStreetMarket).toBe("");

      act(() => {
        handleOnChangeWeekday("sunday");
      });

      rerender();
      expect(mockUseNavigate).toHaveBeenCalledTimes(2);
      expect(mockUseNavigate).toHaveBeenNthCalledWith(2, {
        from: "/city/$city",
        search: {
          open: undefined,
          wd: "sunday",
          smq: undefined,
        },
      });
    });

    it(`GIVEN a call to handleOnChangeWeekday
        WHEN value is falsy
        THEN should call navigate with smq current value of smq`, () => {
      mockUseSearch.mockReturnValue({
        open: true,
        wd: "tuesday",
        smq: "test",
      });
      const {
        result: {
          current: {
            handleOnChangeWeekday,
            weekday,
            openNow,
            searchStreetMarket,
          },
        },
        rerender,
      } = customRenderHook(() => useStreetMarketsFilter());

      expect(weekday).toBe("tuesday");
      expect(openNow).toBe(true);
      expect(searchStreetMarket).toBe("test");

      act(() => {
        handleOnChangeWeekday("");
      });

      rerender();
      expect(mockUseNavigate).toHaveBeenCalledTimes(2);
      expect(mockUseNavigate).toHaveBeenNthCalledWith(2, {
        from: "/city/$city",
        search: {
          open: undefined,
          wd: undefined,
          smq: "test",
        },
      });
    });
  });

  describe("handleOnSearchStreetMarket", () => {
    it(`GIVEN a call to handleOnSearchStreetMarket
        WHEN value is truthy
        THEN should call navigate with smq
        AND open equal to current value
        AND weekDay to current value of weekday`, () => {
      mockUseSearch.mockReturnValue({
        open: true,
        wd: "tuesday",
      });
      const {
        result: {
          current: {
            handleOnSearchStreetMarket,
            weekday,
            openNow,
            searchStreetMarket,
          },
        },
        rerender,
      } = customRenderHook(() => useStreetMarketsFilter());

      expect(weekday).toBe("tuesday");
      expect(openNow).toBe(true);
      expect(searchStreetMarket).toBe("");

      act(() => {
        handleOnSearchStreetMarket({
          target: { value: "test 1234" },
        } as ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        vi.runAllTimers();
        rerender();
      });

      expect(mockUseNavigate).toHaveBeenCalledTimes(2);
      expect(mockUseNavigate).toHaveBeenNthCalledWith(2, {
        from: "/city/$city",
        search: {
          open: true,
          wd: "tuesday",
          smq: "test 1234",
        },
      });
    });

    it(`GIVEN a call to handleOnSearchStreetMarket
        WHEN value is truthy
        THEN should call navigate with smq equal to undefined
        AND open equal to current value
        AND weekDay to current value of weekday`, () => {
      mockUseSearch.mockReturnValue({
        open: true,
        wd: "tuesday",
        smq: "test",
      });
      const {
        result: {
          current: {
            handleOnSearchStreetMarket,
            weekday,
            openNow,
            searchStreetMarket,
          },
        },
        rerender,
      } = customRenderHook(() => useStreetMarketsFilter());

      expect(weekday).toBe("tuesday");
      expect(openNow).toBe(true);
      expect(searchStreetMarket).toBe("test");

      act(() => {
        handleOnSearchStreetMarket({
          target: { value: "" },
        } as ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        vi.runAllTimers();
        rerender();
      });

      expect(mockUseNavigate).toHaveBeenCalledTimes(2);
      expect(mockUseNavigate).toHaveBeenNthCalledWith(2, {
        from: "/city/$city",
        search: {
          open: true,
          wd: "tuesday",
          smq: undefined,
        },
      });
    });
  });
});
