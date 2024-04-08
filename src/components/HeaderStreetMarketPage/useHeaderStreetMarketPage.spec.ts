import { customRenderHook } from "@tests/customRenderHook";
import { useHeaderStreetMarketPage } from "./useHeaderStreetMarketPage";
import { server } from "@tests/server.mock";
import { getStreetMarketBySlugHandlers } from "@tests/getStreetMarketBySlug.mock";

const mockUseParams = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useParams: (args: unknown) => mockUseParams(args),
  };
});

describe("@/components/useHeaderStreetMarketPage", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ streetMarket: "streetMarket" });
  });

  it(`GIVEN a useHeaderStreetMarketPage
      WHEN call
      THEN should return streetMarketService`, () => {
    server.use(getStreetMarketBySlugHandlers.filled);
    const { result } = customRenderHook(() => useHeaderStreetMarketPage());

    expect(result.current).toBeDefined();
  });
});
