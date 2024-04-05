import { createUseGetCitiesQueryKey, useGetCities } from "./getCities";
import { server } from "@tests/server.mock";
import { getCitiesHandlers } from "@tests/getCities.mock";
import { customRenderHook } from "@tests/customRenderHook";
import { waitFor } from "@testing-library/dom";

describe("@/services/getCities", () => {
  const slug = "slug";

  it(`GIVEN a createUseGetCitiesQueryKey
      WHEN call this method with "slug"
      THEN should return ["getCities", "slug"]`, () => {
    const result = createUseGetCitiesQueryKey(slug);
    expect(result).toStrictEqual(["getCities", "slug"]);
  });

  it(`GIVEN a createUseGetCitiesQueryKey
      WHEN service return succes
      AND isLastPage property in metadata property is true
      THEN should NOT have other page`, async () => {
    server.use(getCitiesHandlers.filledOnePage);
    const { result } = customRenderHook(() => useGetCities(slug));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.hasNextPage).toBe(false);
      expect(result.current.dataItems).toHaveLength(1);
    });
  });

  it(`GIVEN a createUseGetCitiesQueryKey
      WHEN service return succes
      AND isLastPage property in metadata property is false
      THEN should have other page`, async () => {
    server.use(getCitiesHandlers.filledMultPagesPageOne);
    const { result } = customRenderHook(() => useGetCities(slug));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.hasNextPage).toBe(true);
      expect(result.current.dataItems).toHaveLength(10);
    });
  });

  it(`GIVEN a createUseGetCitiesQueryKey
      WHEN service return succes
      AND items property is filled with at least one value
      THEN isFilled should be true
      AND isEmpty should be false`, async () => {
    server.use(getCitiesHandlers.filledOnePage);
    const { result } = customRenderHook(() => useGetCities(slug));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.isEmpty).toBe(false);
      expect(result.current.isFilled).toBe(true);
      expect(result.current.dataItems).toHaveLength(1);
    });
  });

  it(`GIVEN a createUseGetCitiesQueryKey
      WHEN service return succes
      AND items property is empty
      THEN isEmpty should be true
      AND isFilled should be false`, async () => {
    server.use(getCitiesHandlers.empty);
    const { result } = customRenderHook(() => useGetCities(slug));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.isFilled).toBe(false);
      expect(result.current.isEmpty).toBe(true);
      expect(result.current.dataItems).toHaveLength(0);
    });
  });
});
