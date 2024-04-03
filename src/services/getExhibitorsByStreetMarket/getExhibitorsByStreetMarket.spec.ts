import {
  createUseGetExhibitorsByStreetMarketQueryKey,
  useGetExhibitorsByStreetMarket,
} from "./getExhibitorsByStreetMarket";
import { server } from "@tests/server.mock";
import { getExhibitorsByStreetMarketHandlers } from "@tests/getExhibitorsByStreetMarket.mock";
import { customRenderHook } from "@tests/customRenderHook";
import { waitFor } from "@testing-library/dom";

describe("@/services/getExhibitorsByStreetMarket", () => {
  const slug = "slug";

  it(`GIVEN a createUseGetExhibitorsByStreetMarketQueryKey
      WHEN call this method with { streetMarket: "slug" }
      THEN should return ["getExhibitorsByStreetMarket", { streetMarket: "slug" }]`, () => {
    const result = createUseGetExhibitorsByStreetMarketQueryKey({
      streetMarket: slug,
    });
    expect(result).toStrictEqual([
      "getExhibitorsByStreetMarket",
      { streetMarket: slug },
    ]);
  });

  it(`GIVEN a createUseGetExhibitorsByStreetMarketQueryKey
      WHEN service return succes
      AND isLastPage property in metadata property is true
      THEN should NOT have other page`, async () => {
    server.use(getExhibitorsByStreetMarketHandlers.filledOnePage);
    const { result } = customRenderHook(() =>
      useGetExhibitorsByStreetMarket({ streetMarket: slug })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.hasNextPage).toBe(false);
    });
  });

  it(`GIVEN a createUseGetExhibitorsByStreetMarketQueryKey
      WHEN service return succes
      AND isLastPage property in metadata property is false
      THEN should have other page`, async () => {
    server.use(getExhibitorsByStreetMarketHandlers.filledMultPagesPageOne);
    const { result } = customRenderHook(() =>
      useGetExhibitorsByStreetMarket({ streetMarket: slug })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.hasNextPage).toBe(true);
    });
  });

  it(`GIVEN a createUseGetExhibitorsByStreetMarketQueryKey
      WHEN service return succes
      AND items property is filled with at least one value
      THEN isFilled should be true
      AND isEmpty should be false`, async () => {
    server.use(getExhibitorsByStreetMarketHandlers.filledOnePage);
    const { result } = customRenderHook(() =>
      useGetExhibitorsByStreetMarket({ streetMarket: slug })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.isEmpty).toBe(false);
      expect(result.current.isFilled).toBe(true);
    });
  });

  it(`GIVEN a createUseGetExhibitorsByStreetMarketQueryKey
      WHEN service return succes
      AND items property is empty
      THEN isEmpty should be true
      AND isFilled should be false`, async () => {
    server.use(getExhibitorsByStreetMarketHandlers.empty);
    const { result } = customRenderHook(() =>
      useGetExhibitorsByStreetMarket({ streetMarket: slug })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.isFilled).toBe(false);
      expect(result.current.isEmpty).toBe(true);
    });
  });
});
