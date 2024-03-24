import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { FC, useCallback, useRef } from "react";
import { HomeSearchBarProps } from "./types";
import { useHomeSearchBar } from "./useHomeSearchBar";

export const HomeSearchBar: FC<HomeSearchBarProps> = () => {

  const observer = useRef<IntersectionObserver>();
  const {
    handleOnChangeSearchValue,
    handleOnKeyPress,
    handleSearch,
    onOpenChange,
    searchValue,
    isOpen,
    citiesService: {
      isFetching,
      isSuccess,
      isError,
      isEmpty,
      isFilled,
      isLoading,
      hasNextPage,
      dataItems,
      fetchNextPage,
      refetch
    }
  } = useHomeSearchBar();

  const lastElementRef = useCallback((node: HTMLParagraphElement) => {
    if (isLoading) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [fetchNextPage, hasNextPage, isFetching, isLoading]);

  function handleOnClickTryAgain() {
    refetch();
  }

  return (
    <div className="w-full max-w-screen-sm flex flex-row gap-1">
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverAnchor asChild>
          <Input
            placeholder="Busque a cidade"
            value={searchValue}
            onChange={handleOnChangeSearchValue}
            onKeyDown={handleOnKeyPress}
          />
        </PopoverAnchor>
        <PopoverContent className="flex flex-col items-start justify-center gap-2 w-[var(--radix-popper-anchor-width)]">
          {isLoading ? (
            Array.from(Array(3).keys()).map((item) =>
              <div key={item} className="flex flex-col justify-center h-11">
                <Skeleton key={item} className="h-6 w-28" />
              </div>
            )
          ) : null}
          {!isLoading && isSuccess && isFilled ? (
            <ScrollArea className="w-full h-[calc(var(--radix-popover-content-available-height)-3rem)] overflow-hidden" >
              <div className="flex flex-col p-1">
                {dataItems.map((city) => (
                  <p
                    key={city.id}
                    ref={lastElementRef}
                    className="p-2 leading-7 text-muted-foreground hover:bg-muted hover:text-primary rounded-sm"
                  >
                    {city.name}
                  </p>
                ))}
                {isFetching ? (
                  Array.from(Array(3).keys()).map((item) =>
                    <div key={item} className="flex flex-col justify-center h-11">
                      <Skeleton key={item} className="h-6 w-28" />
                    </div>
                  )
                ) : null}
              </div>
            </ScrollArea>
          ) : null}
          {!isLoading && isSuccess && isEmpty ? (
            <div className="text-center w-full flex flex-col gap-1 justify-center items-center">
              <p className="leading-6 text-muted-foreground">Não encontramos essa cidade que você busca</p>
            </div>
          ) : null}
          {!isFetching && isError ? (
            <div className="text-center w-full flex flex-col gap-1 justify-center items-center">
              <p className="leading-6 text-muted-foreground">Aconteceu algum erro indo para feira...</p>
              <Button size="default" variant="link" onClick={handleOnClickTryAgain}>Tentar novamente</Button>
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        size="icon"
        aria-label="Buscar cidade"
        onClick={handleSearch}
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};
