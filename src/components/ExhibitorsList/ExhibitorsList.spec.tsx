import { waitFor } from "@testing-library/react";
import { customRender } from "@tests/customRender";
import { ExhibitorsList } from "./ExhibitorsList";
import { server } from "@tests/server.mock";
import { getExhibitorsByStreetMarketHandlers } from "@tests/getExhibitorsByStreetMarket.mock";

const mockUseSearch = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useSearch: (args: unknown) => mockUseSearch(args),
  };
});

describe("@/components/ExhibitorsList", () => {

  beforeEach(() => {
    mockUseSearch.mockReturnValue({});
  });

  it(`GIVEN a ExhibitorsList with search param
      WHEN service return a filled response
      THEN should show the link items`, async () => {
    mockUseSearch.mockReturnValue({ q: "test" });
    server.use(getExhibitorsByStreetMarketHandlers.filledMultPagesPageOne);
    const { getAllByText } = customRender(<ExhibitorsList />)

    await waitFor(() => {
      const links = getAllByText(/Name\s(\d)+/);

      expect(links).toHaveLength(10);
    });
  });

  it(`GIVEN a ExhibitorsList with search param
      WHEN service return a empty response
      THEN should show the empty message`, async () => {
    mockUseSearch.mockReturnValue({ q: "test" });
    server.use(getExhibitorsByStreetMarketHandlers.empty);
    const { getByText } = customRender(<ExhibitorsList />)

    await waitFor(() => {
      const emptyMessage = getByText("Não encontramos resultados para a busca correspondente");

      expect(emptyMessage).toBeVisible();
    });
  });

  it(`GIVEN a ExhibitorsList with search param
      WHEN service return an error
      THEN should show the error message`, async () => {
    mockUseSearch.mockReturnValue({ q: "test" });
    server.use(getExhibitorsByStreetMarketHandlers.error);
    const { getByText } = customRender(<ExhibitorsList />)

    await waitFor(() => {
      const errorMessage = getByText("Ocorreu um erro ao obter os dados. Tente novamente mais tarde.");
      const errorButton = getByText("Tentar novamente");

      expect(errorMessage).toBeVisible();
      expect(errorButton).toBeVisible();
    });
  });
});