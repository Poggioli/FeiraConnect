import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FC } from "react";
import { FarmersMarketCard, FarmersMarketCardLoading } from "./FarmersMarketCard";
import { FarmersMarketListProps } from "./types";
import { useFarmersMarketList } from "./useFarmersMarketList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const FarmersMarketList: FC<FarmersMarketListProps> = ({ city }) => {

  const {
    handleOnCheckedChange,
    handleOnFrequencyChange,
    workingNow,
    frequency,
    service: {
      dataItems,
      isSuccess,
      isFetching
    }
  } = useFarmersMarketList({ city });

  return (
    <>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="w-max flex flex-row items-center gap-4">
          <Toggle
            pressed={workingNow}
            onPressedChange={handleOnCheckedChange}
            variant="outline"
            size="xsm"
            aria-label="Filtrar por feiras que estão abertas agora"
          >
            Funcionando agora
          </Toggle>
          <ToggleGroup type="single" value={frequency || ''} onValueChange={handleOnFrequencyChange}>
            <ToggleGroupItem variant="outline" size="xsm" value="sunday" aria-label="Filtrar por feiras de domingo">
              Domingo
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" size="xsm" value="monday" aria-label="Filtrar por feiras de segunda-feira">
              Segunda-feira
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" size="xsm" value="tuesday" aria-label="Filtrar por feiras de terça-feira">
              Terça-feira
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" size="xsm" value="wednesday" aria-label="Filtrar por feiras de quarta-feira">
              Quarta-feira
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" size="xsm" value="thursday" aria-label="Filtrar por feiras de quinta-feira">
              Quinta-feira
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" size="xsm" value="friday" aria-label="Filtrar por feiras de sexta-feira">
              Sexta-feira
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" size="xsm" value="saturday" aria-label="Filtrar por feiras de sábado">
              Sábado
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3">
        {isFetching ? Array
          .from(Array(10).keys())
          .map((item) => <FarmersMarketCardLoading key={item} />)
          : null
        }
        {!isFetching && dataItems.length && isSuccess ? (
          dataItems.map((item) => <FarmersMarketCard key={item.id} {...item} />)
        ) : null}
      </div>
    </>
  );
};
