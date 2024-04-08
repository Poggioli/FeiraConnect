import { waitFor } from "@testing-library/dom";
import { customRender } from "@tests/customRender";
import { getStreetMarketBySlugHandlers } from "@tests/getStreetMarketBySlug.mock";
import { server } from "@tests/server.mock";
import { HeaderStreetMarketPage } from "./HeaderStreetMarketPage";

const mockUseParams = vi.fn();
const mockNotFound = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useParams: (args: unknown) => mockUseParams(args),
    notFound: (args: unknown) => mockNotFound(args)
  };
});

describe("@/components/HeaderStreetMarketPage", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ streetMarket: "streetMarket" });
  });

  it(`GIVEN a HeaderStreetMarketPage
      WHEN server return success
      THEN should show the name of city`, async () => {
    server.use(getStreetMarketBySlugHandlers.filled);
    const { getByText } = customRender(<HeaderStreetMarketPage />);

    await waitFor(() => {
      const title = getByText("name 1");
      const local = getByText("local");
      expect(local).toBeVisible();
      expect(local.parentElement).toHaveAttribute("href")
      expect(title).toBeVisible();
    })
  });

  it(`GIVEN a HeaderStreetMarketPage
      WHEN not finish load
      THEN should show the loading state`, () => {
    server.use(getStreetMarketBySlugHandlers.filledWithDelay);
    const { baseElement } = customRender(<HeaderStreetMarketPage />);

    expect(baseElement).toMatchSnapshot();
  });

  it(`GIVEN a HeaderStreetMarketPage
      WHEN response is 404
      THEN should call notFound method from @tanstack/react-router`, async () => {
    server.use(getStreetMarketBySlugHandlers.error);
    const { getByText } = customRender(<HeaderStreetMarketPage />);

    await waitFor(() => {
      const errorMessage = getByText('Error Boundary')
      expect(errorMessage).toBeVisible();
      expect(mockNotFound).toHaveBeenCalled();
      expect(mockNotFound).toHaveBeenCalledWith({ routeId: "/city/_$city/$streetMarket" });
    })
  });
});
