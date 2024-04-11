import { customRenderHook } from "@tests/customRenderHook";
import { server } from "@tests/server.mock";
import { useStreetMarketsList } from "./useStreetMarketsList";
import { getStreetMarketsByCityHandlers } from "@tests/getStreetMarketsByCity.mock";
import { waitFor } from "@testing-library/dom";

const mockUseParams = vi.fn();
const mockUseSearch = vi.fn();
const mockUseIsFetching = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useParams: (args: unknown) => mockUseParams(args),
    useSearch: (args: unknown) => mockUseSearch(args),
  };
});

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useIsFetching: (args: unknown) => mockUseIsFetching(args),
  };
});

describe("@/components/useStreetMarketsList", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ city: "city" });
    mockUseSearch.mockReturnValue({});
  });

  it(`GIVEN a call to useStreetMarketsList
      WHEN useGetStreetMarketBySlug is loading yet
      AND useGetExhibitorsByStreetMarket is already loaded
      THEN isLoading props should be true`, async () => {
    mockUseSearch.mockReturnValue({ open: true });
    server.use(getStreetMarketsByCityHandlers.filledOnePage);
    mockUseIsFetching.mockReturnValueOnce(1);
    const { result } = customRenderHook(() => useStreetMarketsList());

    await waitFor(() => {
      expect(result.current.streetMarketsByCityService.isLoading).toBe(
        true
      );
    });
  });

  it(`GIVEN a call to useStreetMarketsList
      WHEN useGetStreetMarketBySlug is loading yet
      AND useGetExhibitorsByStreetMarket is loading yet
      THEN isLoading props should be true`, async () => {
    server.use(getStreetMarketsByCityHandlers.filledOnePageWithDelay);
    mockUseIsFetching.mockReturnValueOnce(1);
    const { result } = customRenderHook(() => useStreetMarketsList());

    await waitFor(() => {
      expect(result.current.streetMarketsByCityService.isLoading).toBe(
        true
      );
    });
  });

  it(`GIVEN a call to useStreetMarketsList
      WHEN useGetStreetMarketBySlug is already loaded
      AND useGetExhibitorsByStreetMarket is loading yet
      THEN isLoading props should be true`, async () => {
    server.use(getStreetMarketsByCityHandlers.filledOnePageWithDelay);
    mockUseIsFetching.mockReturnValueOnce(0);
    const { result } = customRenderHook(() => useStreetMarketsList());

    await waitFor(() => {
      expect(result.current.streetMarketsByCityService.isLoading).toBe(
        true
      );
    });
  });

  it(`GIVEN a call to useStreetMarketsList
      WHEN useGetStreetMarketBySlug is already loaded
      AND useGetExhibitorsByStreetMarket is already loaded
      THEN isLoading props should be false`, async () => {
    server.use(getStreetMarketsByCityHandlers.filledOnePage);
    mockUseIsFetching.mockReturnValue(0);
    const { result } = customRenderHook(() => useStreetMarketsList());

    await waitFor(() => {
      expect(result.current.streetMarketsByCityService.isLoading).toBe(
        false
      );
    });
  });
});
