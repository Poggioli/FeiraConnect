import { FC, useCallback, useRef } from "react";
import { useExhibitorsList } from "./useExhibitorsList";
import { EmptyResponse } from "@/components/EmptyResponse";
import { TryAgain } from "@/components/TryAgain";
import { ExhibitorCard, ExhibitorCardSkeleton } from "@/components/ExhibitorCard";

export const ExhibitorsList: FC = () => {

  const observer = useRef<IntersectionObserver>();
  const {
    exhibitorsByStreetMarketService: {
      isLoading,
      hasNextPage,
      isFetching,
      isSuccess,
      isFilled,
      isEmpty,
      isError,
      dataItems,
      fetchNextPage,
      refetch
    }
  } = useExhibitorsList();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
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
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  return (
    <>
      {isSuccess || isFetching ? (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 z-0 pb-6 md:pb-12">
            {isSuccess && isFilled && !isLoading ? (
              dataItems.map((item) => <ExhibitorCard key={item.id} ref={lastElementRef} {...item} />)
            ) : null}
            {isFetching || isLoading ? (
              Array.from(Array(10).keys()).map((i) => <ExhibitorCardSkeleton key={i} />)
            ) : null}
          </div>
        </>
      ) : null}
      {!isLoading && !isFetching && isSuccess && isEmpty ? (
        <EmptyResponse.Container className="h-full">
          <EmptyResponse.Image />
          <EmptyResponse.Message>
            Não encontramos resultados para a busca correspondente
          </EmptyResponse.Message>
        </EmptyResponse.Container>
      ) : null}
      {!isLoading && !isFetching && isError ? (<TryAgain refetch={refetch} className="h-full" />) : null}
    </>
  );
};
