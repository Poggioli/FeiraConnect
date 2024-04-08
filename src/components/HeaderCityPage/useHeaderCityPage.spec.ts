import { customRenderHook } from "@tests/customRenderHook";
import { useHeaderCityPage } from "./useHeaderCityPage";
import { server } from "@tests/server.mock";
import { getCityBySlugHandlers } from "@tests/getCityBySlug.mock";

const mockUseParams = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useParams: (args: unknown) => mockUseParams(args),
  };
});

describe("@/components/useHeaderCityPage", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ city: "city" });
  });

  it(`GIVEN a useHeadercityPage
      WHEN call
      THEN should return cityService`, () => {
    server.use(getCityBySlugHandlers.filled);
    const { result } = customRenderHook(() => useHeaderCityPage());

    expect(result.current).toBeDefined();
  });
});
