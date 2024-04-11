import { waitFor } from "@testing-library/react";
import { customRender } from "@tests/customRender";
import { StreetMarketsList } from "./StreetMarketsList";
import { server } from "@tests/server.mock";
import { getStreetMarketsByCityHandlers } from "@tests/getStreetMarketsByCity.mock";

const mockUseParams = vi.fn();
const mockUseSearch = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useParams: (args: unknown) => mockUseParams(args),
    useSearch: (args: unknown) => mockUseSearch(args),
  };
});

describe("@/components/StreetMarketsList", () => {

  beforeEach(() => {
    mockUseParams.mockReturnValue({ city: "city" });
    mockUseSearch.mockReturnValue({});
  });

  it(`GIVEN a StreetMarketsList with search param
      WHEN service return a filled response
      THEN should show the link items`, async () => {
    server.use(getStreetMarketsByCityHandlers.filledMultPagesPageOne);
    const { getAllByText } = customRender(<StreetMarketsList />)

    await waitFor(() => {
      const links = getAllByText(/Name\s(\d)+/);

      expect(links).toHaveLength(10);
    });
  });

  it(`GIVEN a StreetMarketsList with search param
      WHEN service return a empty response
      THEN should show the empty message`, async () => {
    server.use(getStreetMarketsByCityHandlers.empty);
    const { getByText } = customRender(<StreetMarketsList />)

    await waitFor(() => {
      const emptyMessage = getByText("Não encontramos resultados para a busca correspondente");

      expect(emptyMessage).toBeVisible();
    });
  });

  it(`GIVEN a StreetMarketsList with search param
      WHEN service return an error
      THEN should show the error message`, async () => {
    server.use(getStreetMarketsByCityHandlers.error);
    const { getByText } = customRender(<StreetMarketsList />)

    await waitFor(() => {
      const errorMessage = getByText("Ocorreu um erro ao obter os dados. Tente novamente mais tarde.");
      const errorButton = getByText("Tentar novamente");

      expect(errorMessage).toBeVisible();
      expect(errorButton).toBeVisible();
    });
  });
});