import { customRenderHook } from "@tests/customRenderHook";
import { server } from "@tests/server.mock";
import { useExhibitorsList } from "./useExhibitorsList";
import { getExhibitorsByStreetMarketHandlers } from "@tests/getExhibitorsByStreetMarket.mock";
import { waitFor } from "@testing-library/dom";

const mockUseParams = vi.fn();
const mockUseIsFetching = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useParams: (args: unknown) => mockUseParams(args),
  };
});

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useIsFetching: (args: unknown) => mockUseIsFetching(args),
  };
});

describe("@/components/useExhibitorsList", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ streetMarket: "streetMarket" });
  });

  it(`GIVEN a call to useExhibitorsList
      WHEN useGetStreetMarketBySlug is loading yet
      AND useGetExhibitorsByStreetMarket is already loaded
      THEN isLoading props should be true`, async () => {
    server.use(getExhibitorsByStreetMarketHandlers.filledOnePage);
    mockUseIsFetching.mockReturnValueOnce(1);
    const { result } = customRenderHook(() => useExhibitorsList());

    await waitFor(() => {
      expect(result.current.exhibitorsByStreetMarketService.isLoading).toBe(
        true
      );
    });
  });

  it(`GIVEN a call to useExhibitorsList
      WHEN useGetStreetMarketBySlug is loading yet
      AND useGetExhibitorsByStreetMarket is loading yet
      THEN isLoading props should be true`, async () => {
    server.use(getExhibitorsByStreetMarketHandlers.filledOnePageWithDelay);
    mockUseIsFetching.mockReturnValueOnce(1);
    const { result } = customRenderHook(() => useExhibitorsList());

    await waitFor(() => {
      expect(result.current.exhibitorsByStreetMarketService.isLoading).toBe(
        true
      );
    });
  });

  it(`GIVEN a call to useExhibitorsList
      WHEN useGetStreetMarketBySlug is already loaded
      AND useGetExhibitorsByStreetMarket is loading yet
      THEN isLoading props should be true`, async () => {
    server.use(getExhibitorsByStreetMarketHandlers.filledOnePageWithDelay);
    mockUseIsFetching.mockReturnValueOnce(0);
    const { result } = customRenderHook(() => useExhibitorsList());

    await waitFor(() => {
      expect(result.current.exhibitorsByStreetMarketService.isLoading).toBe(
        true
      );
    });
  });

  it.only(`GIVEN a call to useExhibitorsList
      WHEN useGetStreetMarketBySlug is already loaded
      AND useGetExhibitorsByStreetMarket is already loaded
      THEN isLoading props should be false`, async () => {
    server.use(getExhibitorsByStreetMarketHandlers.filledOnePage);
    mockUseIsFetching.mockReturnValue(0);
    const { result } = customRenderHook(() => useExhibitorsList());

    await waitFor(() => {
      expect(result.current.exhibitorsByStreetMarketService.isLoading).toBe(
        false
      );
    });
  });
});
