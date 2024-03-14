import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { LoaderCircle, SearchIcon } from "lucide-react";
import { FC, useCallback, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IndexSearchBarProps } from "./types";
import { useIndexSearchBar } from "./useIndexSearchBar";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export const IndexSearchBar: FC<IndexSearchBarProps> = () => {

  const observer = useRef<IntersectionObserver>();
  const {
    open,
    setOpen,
    searchTerm,
    handleChange,
    serviceUseSearchCityByName: {
      isFetching,
      isSuccess,
      isError,
      dataItems,
      fetchNextPage,
      hasNextPage,
      isLoading
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
        {!isLoading && isSuccess && dataItems.length ? (
          <ScrollArea className="h-[calc(var(--radix-popover-content-available-height)-3rem)]" >
            <div className="flex flex-col">
              {dataItems.map((city) => (
                <Link ref={lastElementRef} to="/" key={city.slug} className="py-2 px-2 leading-7 text-muted-foreground hover:bg-muted hover:text-primary rounded-sm">{city.name}</Link>
              ))}
              {isFetching ? (
                <p className="flex flex-row gap-3 justify-center items-center leading-7 text-muted-foreground">
                  Buscando mais cidades <LoaderCircle className="h-5 w-5 animate-spin" />
                </p>
              ) : null}
            </div>
          </ScrollArea>
        ) : null}
        {!isLoading && isSuccess && !dataItems.length ? (
          <p>Não encontramos nenhuma cidade com este nome</p>
        ) : null}
        {!isLoading && isError ? <p>Erro</p> : null}
      </PopoverContent>
    </Popover>
  );
};
