import { EmptyResponse } from "@/components/EmptyResponse";
import { StreetMarketCard, StreetMarketCardSkeleton } from "@/components/StreetMarketCard";
import { TryAgain } from "@/components/TryAgain";
import { FC, useCallback, useRef } from "react";
import { StreetMarketBackground } from "@/components/StreetMarketBackground";
import { useStreetMarketsList } from "./useStreetMarketsList";

export const StreetMarketsList: FC = () => {

  const observer = useRef<IntersectionObserver>();
  const {
    streetMarketsByCityService: {
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
  } = useStreetMarketsList();

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
          <StreetMarketBackground />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 z-0">
            {isSuccess && isFilled && !isLoading ? (
              dataItems.map((item) => <StreetMarketCard key={item.id} ref={lastElementRef} {...item} />)
            ) : null}
            {isFetching || isLoading ? (
              Array.from(Array(10).keys()).map((i) => <StreetMarketCardSkeleton key={i} />)
            ) : null}
          </div>
        </>
      ) : null}
      {!isLoading && isSuccess && isEmpty ? (<EmptyResponse className="h-full" />) : null}
      {!isLoading && isError ? (<TryAgain refetch={refetch} className="h-full" />) : null}
    </>
  );
};
