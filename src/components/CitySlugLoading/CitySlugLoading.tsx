import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FarmersMarketCardLoading } from "@/components/FarmersMarketList/FarmersMarketCard";

export const CitySlugLoading: FC = () => {

  return (
    <div className="p-6 md:p-12 h-full w-full flex flex-col gap-4 items-start max-w-screen-xlg m-auto">
      <Skeleton className="min-h-10 w-40" />
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="w-max flex flex-row items-center gap-4">
          <Skeleton className="h-6 w-32" />
          <div className="w-max flex flex-row items-center gap-1">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3">
        {Array.from(Array(10).keys()).map((item) => <FarmersMarketCardLoading key={item} />)}
      </div>
    </div>
  );
};
