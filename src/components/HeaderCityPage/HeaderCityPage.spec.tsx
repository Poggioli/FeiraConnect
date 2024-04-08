import { waitFor } from "@testing-library/dom";
import { customRender } from "@tests/customRender";
import { getCityBySlugHandlers } from "@tests/getCityBySlug.mock";
import { server } from "@tests/server.mock";
import { HeaderCityPage } from "./HeaderCityPage";

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

describe("@/components/HeaderCityPage", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ city: "slug" });
  });

  it(`GIVEN a HeaderCityPage
      WHEN server return success
      THEN should show the name of city`, async () => {
    server.use(getCityBySlugHandlers.filled);
    const { getByText } = customRender(<HeaderCityPage />);

    await waitFor(() => {
      const title = getByText("Slug 1");
      expect(title).toBeVisible();
    })
  });

  it(`GIVEN a HeaderCityPage
      WHEN not finish load
      THEN should show the loading state`, () => {
    server.use(getCityBySlugHandlers.filledWithDelay);
    const { baseElement } = customRender(<HeaderCityPage />);

    expect(baseElement).toMatchSnapshot();
  });

  it(`GIVEN a HeaderCityPage
      WHEN response is 404
      THEN should call notFound method from @tanstack/react-router`, async () => {
    server.use(getCityBySlugHandlers.error);
    const { getByText } = customRender(<HeaderCityPage />);

    await waitFor(() => {
      const errorMessage = getByText('Error Boundary')
      expect(errorMessage).toBeVisible();
      expect(mockNotFound).toHaveBeenCalled();
      expect(mockNotFound).toHaveBeenCalledWith({ routeId: "/city/$city" });
    })
  });
});
