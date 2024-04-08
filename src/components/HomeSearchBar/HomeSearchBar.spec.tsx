import { waitFor } from "@testing-library/react";
import { customRender } from "@tests/customRender";
import { HomeSearchBar } from "./HomeSearchBar";
import { server } from "@tests/server.mock";
import { getCitiesHandlers } from "@tests/getCities.mock";

const mockUseSearch = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useSearch: (args: unknown) => mockUseSearch(args),
  };
});

describe("@/components/HomeSearchBar", () => {

  beforeEach(() => {
    mockUseSearch.mockReturnValue({});
  });

  it(`GIVEN a HomeSearchBar
      WHEN render
      THEN should show default state`, async () => {
    const { getByPlaceholderText, getByLabelText } = customRender(<HomeSearchBar />)

    await waitFor(() => {
      const input = getByPlaceholderText("Busque a cidade");
      const searchButton = getByLabelText("Buscar cidade");

      expect(input).toBeVisible();
      expect(searchButton).toBeVisible();
    });
  });

  it(`GIVEN a HomeSearchBar with search param
      WHEN service return a filled response
      THEN should show the link items`, async () => {
    mockUseSearch.mockReturnValue({ q: "test" });
    server.use(getCitiesHandlers.filledMultPagesPageOne);
    const { getByRole, getAllByText } = customRender(<HomeSearchBar />)

    await waitFor(() => {
      const popover = getByRole("dialog");
      const links = getAllByText(/Slug\s(\d)+/);

      expect(popover).toBeVisible();
      expect(links).toHaveLength(10);
    });
  });

  it(`GIVEN a HomeSearchBar with search param
      WHEN service return a empty response
      THEN should show the empty message`, async () => {
    mockUseSearch.mockReturnValue({ q: "test" });
    server.use(getCitiesHandlers.empty);
    const { getByText } = customRender(<HomeSearchBar />)

    await waitFor(() => {
      const emptyMessage = getByText("Não encontramos nenhuma cidade com este nome, entre em contato conosco.");

      expect(emptyMessage).toBeVisible();
    });
  });

  it(`GIVEN a HomeSearchBar with search param
      WHEN service return an error
      THEN should show the error message`, async () => {
    mockUseSearch.mockReturnValue({ q: "test" });
    server.use(getCitiesHandlers.error);
    const { getByText } = customRender(<HomeSearchBar />)

    await waitFor(() => {
      const errorMessage = getByText("Ocorreu um erro ao obter os dados. Tente novamente mais tarde.");
      const errorButton = getByText("Tentar novamente");

      expect(errorMessage).toBeVisible();
      expect(errorButton).toBeVisible();
    });
  });

  it(`GIVEN a HomeSearchBar with search param
      WHEN service is in loading state
      THEN should show the Skleton elements
      AND have aria-busy as true`, async () => {
    mockUseSearch.mockReturnValue({ q: "test" });
    server.use(getCitiesHandlers.filledOnePageWithDelay);
    const { getByRole, baseElement } = customRender(<HomeSearchBar />);

    await waitFor(() => {
      const popover = getByRole("dialog");
      expect(popover).toHaveAttribute("aria-busy", "true");
      expect(baseElement).toMatchSnapshot();
    })
  })
});