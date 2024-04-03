import { waitFor } from "@testing-library/dom";
import { customRenderHook } from "@tests/customRenderHook";
import { getStreetMarketBySlugHandlers } from "@tests/getStreetMarketBySlug.mock";
import { server } from "@tests/server.mock";
import {
  createGetStreetMarketBySlugQueryKey,
  useGetStreetMarketBySlug,
} from "./getStreetMarketBySlug";

describe("@/services/getStreetMarketBySlug", () => {
  const slug = "slug";

  it(`GIVEN a createGetStreetMarketBySlugQueryKey
      WHEN call this method with "slug"
      THEN should return ["getStreetMarketBySlug", "slug"]`, () => {
    const result = createGetStreetMarketBySlugQueryKey(slug);
    expect(result).toStrictEqual(["getStreetMarketBySlug", "slug"]);
  });

  it(`GIVEN a useGetStreetMarketBySlug
      WHEN service return succes
      THEN data should be defined`, async () => {
    server.use(getStreetMarketBySlugHandlers.filled);
    const { result } = customRenderHook(() =>
      useGetStreetMarketBySlug({
        queryKey: createGetStreetMarketBySlugQueryKey(slug),
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeDefined();
    });
  });
});
