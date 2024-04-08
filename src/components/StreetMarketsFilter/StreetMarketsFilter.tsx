import { Toggle } from "@/components/ui/toggle";
import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useStreetMarketsFilter } from "./useStreetMarketsFilter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export const StreetMarketsFilter: FC = () => {

  const {
    openNow,
    handleOnChangeNowOpen,
    weekday,
    handleOnChangeWeekday,
    searchStreetMarket,
    handleOnSearchStreetMarket,
    isLoading
  } = useStreetMarketsFilter();

  return (
    <>
      <ScrollArea className="w-full whitespace-nowrap">
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
                <ToggleGroupItem
                  className="whitespace-nowrap"
                  size="xsm"
                  variant="outline"
                  value="sunday"
                  aria-label="Visualizar feiras de domingo"
                >
                  Domingo
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="whitespace-nowrap"
                  size="xsm"
                  variant="outline"
                  value="monday"
                  aria-label="Visualizar feiras de segunda-feira"
                >
                  Segunda-feira
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="whitespace-nowrap"
                  size="xsm"
                  variant="outline"
                  value="tuesday"
                  aria-label="Visualizar feiras de terça-feira"
                >
                  Terça-feira
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="whitespace-nowrap"
                  size="xsm"
                  variant="outline"
                  value="wednesday"
                  aria-label="Visualizar feiras de quarta-feira"
                >
                  Quarta-feira
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="whitespace-nowrap"
                  size="xsm"
                  variant="outline"
                  value="thursday"
                  aria-label="Visualizar feiras de quinta-feira"
                >
                  Quinta-feira
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="whitespace-nowrap"
                  size="xsm"
                  variant="outline"
                  value="friday"
                  aria-label="Visualizar feiras de sexta-feira"
                >
                  Sexta-feira
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="whitespace-nowrap"
                  size="xsm"
                  variant="outline"
                  value="saturday"
                  aria-label="Visualizar feiras de sábado"
                >
                  Sábado
                </ToggleGroupItem>
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
