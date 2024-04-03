import { createUseGetStreetMarketsByCityQueryKey, useGetStreetMarketsByCity } from "./getStreetMarketsByCity";
import { server } from "@tests/server.mock";
import { getStreetMarketsByCityHandlers } from "@tests/getStreetMarketsByCity.mock";
import { customRenderHook } from "@tests/customRenderHook";
import { waitFor } from "@testing-library/dom";

describe("@/services/getStreetMarketsByCity", () => {
  const slug = "slug";

  it(`GIVEN a createUseGetStreetMarketsByCityQueryKey
      WHEN call this method with "slug"
      THEN should return ["getStreetMarketsByCity", "slug"]`, () => {
    const result = createUseGetStreetMarketsByCityQueryKey({ city: slug });
    expect(result).toStrictEqual(["getStreetMarketsByCity", { city: slug }]);
  });

  it(`GIVEN a createUseGetStreetMarketsByCityQueryKey
      WHEN service return succes
      AND isLastPage property in metadata property is true
      THEN should NOT have other page`, async () => {
    server.use(getStreetMarketsByCityHandlers.filledOnePage);
    const { result } = customRenderHook(() => useGetStreetMarketsByCity({ city: slug }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.hasNextPage).toBe(false);
    });
  });

  it(`GIVEN a createUseGetStreetMarketsByCityQueryKey
      WHEN service return succes
      AND isLastPage property in metadata property is false
      THEN should have other page`, async () => {
    server.use(getStreetMarketsByCityHandlers.filledMultPagesPageOne);
    const { result } = customRenderHook(() => useGetStreetMarketsByCity({ city: slug }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.hasNextPage).toBe(true);
    });
  });

  it(`GIVEN a createUseGetStreetMarketsByCityQueryKey
      WHEN service return succes
      AND items property is filled with at least one value
      THEN isFilled should be true
      AND isEmpty should be false`, async () => {
    server.use(getStreetMarketsByCityHandlers.filledOnePage);
    const { result } = customRenderHook(() => useGetStreetMarketsByCity({ city: slug }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.isEmpty).toBe(false);
      expect(result.current.isFilled).toBe(true);
    });
  });

  it(`GIVEN a createUseGetStreetMarketsByCityQueryKey
      WHEN service return succes
      AND items property is empty
      THEN isEmpty should be true
      AND isFilled should be false`, async () => {
    server.use(getStreetMarketsByCityHandlers.empty);
    const { result } = customRenderHook(() => useGetStreetMarketsByCity({ city: slug }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.isFilled).toBe(false);
      expect(result.current.isEmpty).toBe(true);
    });
  });
});
