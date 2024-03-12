import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { SearchIcon } from "lucide-react";
import { FC } from "react";
import { IndexSearchBarProps } from "./types";
import { useIndexSearchBar } from "./useIndexSearchBar";

export const IndexSearchBar: FC<IndexSearchBarProps> = () => {

  const { open, setOpen, searchTerm, handleChange, handleOnFocus } = useIndexSearchBar();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor className="w-full max-w-screen-sm">
        <div className="relative">
          <Input onChange={handleChange} onFocus={handleOnFocus} value={searchTerm} className="pr-8" placeholder="Pesquise a cidade da feira" type="autocomplete" />
          <SearchIcon className="w-5 h-5 absolute right-2 top-2" />
        </div>
      </PopoverAnchor>
      <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-4">
        Buscando
      </PopoverContent>
    </Popover>
  );
};
