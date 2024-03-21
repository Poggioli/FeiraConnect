import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { LoaderCircle, SearchIcon } from "lucide-react";
import { FC, useCallback, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IndexSearchBarProps } from "./types";
import { useIndexSearchBar } from "./useIndexSearchBar";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const IndexSearchBar: FC<IndexSearchBarProps> = () => {

  const observer = useRef<IntersectionObserver>();
  const {
    open,
    setOpen,
    searchTerm,
    handleChange,
    service: {
      isFetching,
      isSuccess,
      isError,
      dataItems,
      fetchNextPage,
      hasNextPage,
      isLoading,
      refetch
    },
    handleKeyDown,
    searchCity
  } = useIndexSearchBar();

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor className="w-full max-w-screen-sm">
        <div className="relative">
          <Input onChange={handleChange} onKeyDown={handleKeyDown} value={searchTerm} className="pr-8" placeholder="Pesquise a cidade da feira" />
          <Button variant="outline" size="icon" onClick={searchCity} className="absolute right-0 top-0">
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>
      </PopoverAnchor>
      <PopoverContent className="w-[var(--radix-popper-anchor-width)] max-h-[calc(var(--radix-popper-available-height)-1rem)] p-4">
        {isLoading ? (
          <p className="flex flex-row gap-3 justify-center items-center leading-7 text-muted-foreground">
            Buscando cidades <LoaderCircle className="h-5 w-5 animate-spin" />
          </p>
        ) : null}
        {isSuccess && dataItems.length ? (
          <ScrollArea className="h-[calc(var(--radix-popover-content-available-height)-3rem)] overflow-hidden" >
            <div className="flex flex-col">
              {dataItems.map((city) => (
                <Link
                  ref={lastElementRef}
                  to="/city/$slug"
                  params={{
                    slug: city.slug
                  }}
                  key={city.slug}
                  className="py-2 px-2 leading-7 text-muted-foreground hover:bg-muted hover:text-primary rounded-sm"
                >
                  {city.name}
                </Link>
              ))}
              {isFetching ? (
                <p className="flex flex-row gap-3 justify-center items-center leading-7 text-muted-foreground">
                  Buscando mais cidades <LoaderCircle className="h-5 w-5 animate-spin" />
                </p>
              ) : null}
            </div>
          </ScrollArea>
        ) : null}
        {isSuccess && !dataItems.length ? (
          <p className="flex flex-row gap-3 justify-center items-center leading-7 text-muted-foreground">
            Não encontramos nenhuma cidade com este nome
          </p>
        ) : null}
        {isError ? (
          <p className="flex flex-row gap-3 justify-center items-center leading-7 text-muted-foreground">
            Ops, aconteceu algum erro...<span className="underline-offset-2 underline hover:cursor-pointer" tabIndex={1} onClick={() => refetch()}>Tentar novamente</span>
          </p>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};
