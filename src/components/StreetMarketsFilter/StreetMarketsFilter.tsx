import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FC } from "react";
import { useStreetMarketsFilter } from "./useStreetMarketsFilter";

export const StreetMarketsFilter: FC = () => {

  const {
    openNow,
    handleOnChangeNowOpen,
    weekday,
    handleOnChangeWeekday,
    searchStreetMarket,
    handleOnSearchStreetMarket,
    isLoading,
    week
  } = useStreetMarketsFilter();

  return (
    <>
      <ScrollArea className="w-full whitespace-nowrap" aria-busy={isLoading ? "true" : undefined}>
        <div className="flex flex-row gap-4 items-center">
          {isLoading ? (
            <>
              <Skeleton className="h-[1.375rem] w-28" />
              <div className="flex flex-row gap-1 items-center">
                {Array.from(Array(7).keys()).map((i) => <Skeleton key={i} className="h-[1.375rem] w-24" />)}
              </div>
            </>
          ) : (
            <>
              <Toggle
                className="whitespace-nowrap"
                size="xsm"
                variant="outline"
                aria-label="Feiras abertas agora"
                pressed={openNow}
                onPressedChange={handleOnChangeNowOpen}
              >
                Abertas agora
              </Toggle>
              <ToggleGroup
                type="single"
                value={weekday}
                onValueChange={handleOnChangeWeekday}
              >
                {
                  week.map(({ label, value }) => (
                    <ToggleGroupItem
                      key={value}
                      className="whitespace-nowrap"
                      size="xsm"
                      variant="outline"
                      value={value}
                      aria-label={`Visualizar feiras de ${label}`}
                    >
                      {label}
                    </ToggleGroupItem>
                  ))
                }
              </ToggleGroup>
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {isLoading ? (
        <Skeleton className="h-7 w-full md:w-[50%]" />
      ) : (
        <Input value={searchStreetMarket} onChange={handleOnSearchStreetMarket} placeholder="Busque uma feira pelo nome" />
      )}
    </>
  );
};
