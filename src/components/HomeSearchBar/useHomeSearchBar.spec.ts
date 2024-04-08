 import { FetchNextPageOptions } from "@tanstack/react-query";
import { act } from "@testing-library/react";
import { customRenderHook } from "@tests/customRenderHook";
import { ChangeEvent, KeyboardEvent } from "react";
import { useHomeSearchBar } from "./useHomeSearchBar";

const mockUseNavigate = vi.fn();
const mockUseSearch = vi.fn();
const mockFetchNextPage = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<Record<string, unknown>>();
  return {
    ...original,
    useNavigate: () => mockUseNavigate,
    useSearch: (args: unknown) => mockUseSearch(args),
  };
});

vi.mock("@/services/getCities", () => ({
  useGetCities: () => ({
    fetchNextPage: (options?: FetchNextPageOptions) =>
      mockFetchNextPage(options),
  }),
}));

describe("@/components/useHomeSearchBar", () => {
  beforeEach(() => {
    mockUseSearch.mockReturnValue({});
  });

  it(`GIVEN a useHomeSearchBar
      WHEN call
      THEN should render with default value`, async () => {
    const { result } = customRenderHook(() => useHomeSearchBar());

    expect(result.current.searchValue).toBe("");
    expect(result.current.isOpen).toBe(false);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(0);
  });

  it(`GIVEN a useHomeSearchBar
      WHEN method handleOnChangeSearchValue is called
      THEN should call navigate with the value in handleOnChangeSearchValue`, async () => {
    const { result } = customRenderHook(() => useHomeSearchBar());

    result.current.handleOnChangeSearchValue({
      target: {
        value: "test",
      },
    } as ChangeEvent<HTMLInputElement>);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith({
      search: { q: "test" },
      replace: true,
    });
  });

  it(`GIVEN a first render
      WHEN q in search is defined
      THEN should call handleSearch`, () => {
    mockUseSearch.mockReturnValue({ q: "test" });
    const { result } = customRenderHook(() => useHomeSearchBar());

    expect(result.current.searchValue).toBe("test");
    expect(result.current.isOpen).toBe(true);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  describe("handleSearch", () => {
    it(`GIVEN a call to handleSearch
        WHEN q in search is a falsy value
        THEN should not change the open props
        AND not call fetchNextPage`, () => {
      const { result } = customRenderHook(() => useHomeSearchBar());

      act(() => {
        result.current.handleSearch();
      });

      expect(result.current.isOpen).toBe(false);
      expect(mockFetchNextPage).toHaveBeenCalledTimes(0);
    });

    it(`GIVEN a call to handleSearch
        WHEN q in search is a truthy value
        THEN should change the open props
        AND call fetchNextPage`, () => {
      const { result, rerender } = customRenderHook(() => useHomeSearchBar());

      mockUseSearch.mockReturnValue({ q: "test" });
      rerender();
      act(() => {
        result.current.handleSearch();
      });

      expect(result.current.isOpen).toBe(true);
      expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleOnKeyPress", () => {
    it(`GIVEN a call to handleOnKeyPress
        WHEN key is NOT Enter
        THEN should NOT call handleSearch`, () => {
      const { result } = customRenderHook(() => useHomeSearchBar());

      act(() => {
        result.current.handleOnKeyPress({
          key: "Esc",
        } as KeyboardEvent<HTMLInputElement>);
      });

      expect(result.current.isOpen).toBe(false);
      expect(mockFetchNextPage).toHaveBeenCalledTimes(0);
    });

    it(`GIVEN a call to handleOnKeyPress
        WHEN key is Enter
        THEN should call handleSearch`, () => {
      const { result, rerender } = customRenderHook(() => useHomeSearchBar());
      mockUseSearch.mockReturnValue({ q: "test" });

      rerender();
      act(() => {
        result.current.handleOnKeyPress({
          key: "Enter",
        } as KeyboardEvent<HTMLInputElement>);
      });

      expect(result.current.isOpen).toBe(true);
      expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
    });
  });
});
