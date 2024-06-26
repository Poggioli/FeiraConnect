import { EmptyResponse } from "@/components/EmptyResponse";
import { TryAgain } from "@/components/TryAgain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { FC, useCallback, useRef } from "react";
import { useHomeSearchBar } from "./useHomeSearchBar";

export const HomeSearchBar: FC = () => {

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

  const lastElementRef = useCallback((node: HTMLAnchorElement) => {
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
        <PopoverContent className="flex flex-col items-start justify-center gap-2 w-[var(--radix-popper-anchor-width)]" aria-busy={isLoading || isFetching ? "true" : undefined}>
          {isLoading ? (
            Array.from(Array(3).keys()).map((item) =>
              <div key={item} className="flex flex-col justify-center h-11">
                <Skeleton className="h-6 w-28" />
              </div>
            )
          ) : null}
          {!isLoading && isSuccess && isFilled ? (
            <ScrollArea className="w-full h-[calc(var(--radix-popover-content-available-height)-3rem)] overflow-hidden">
              <div className="flex flex-col p-1">
                {dataItems.map(({ name, slug, id }) => (
                  <Link
                    to="/city/$city"
                    params={{
                      city: slug
                    }}
                    key={id}
                    ref={lastElementRef}
                    className="p-2 leading-7 text-muted-foreground hover:bg-muted hover:text-primary rounded-sm"
                  >
                    {name}
                  </Link>
                ))}
                {isFetching ? (
                  Array.from(Array(3).keys()).map((item) =>
                    <div key={item} className="flex flex-col justify-center h-11">
                      <Skeleton className="h-6 w-28" />
                    </div>
                  )
                ) : null}
              </div>
            </ScrollArea>
          ) : null}
          {!isLoading && isSuccess && isEmpty ? (
            <EmptyResponse.Container className="h-full">
              <EmptyResponse.Image />
              <EmptyResponse.Message>
                Não encontramos nenhuma cidade com este nome, entre em contato conosco.
              </EmptyResponse.Message>
            </EmptyResponse.Container>
          ) : null}
          {!isLoading && isError ? (<TryAgain refetch={refetch} className="h-full" />) : null}
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
