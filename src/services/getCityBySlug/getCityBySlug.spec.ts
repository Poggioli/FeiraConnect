import { waitFor } from "@testing-library/dom";
import { customRenderHook } from "@tests/customRenderHook";
import { getCityBySlugHandlers } from "@tests/getCityBySlug.mock";
import { server } from "@tests/server.mock";
import { createGetCityBySlugQueryKey, useGetCityBySlug } from "./getCityBySlug";

describe("@/services/getCityBySlug", () => {
  const slug = "slug";

  it(`GIVEN a createGetCityBySlugQueryKey
      WHEN call this method with "slug"
      THEN should return ["getCityBySlug", "slug"]`, () => {
    const result = createGetCityBySlugQueryKey(slug);
    expect(result).toStrictEqual(["getCityBySlug", "slug"]);
  });

  it(`GIVEN a useGetCityBySlug
      WHEN service return succes
      THEN data should be defined`, async () => {
    server.use(getCityBySlugHandlers.filled);
    const { result } = customRenderHook(() =>
      useGetCityBySlug({ queryKey: createGetCityBySlugQueryKey(slug) })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeDefined();
    });
  });
});
