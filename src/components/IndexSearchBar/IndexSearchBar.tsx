import { FC } from "react";
import { IndexSearchBarProps } from "./types";
import { useIndexSearchBar } from "./useIndexSearchBar";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const IndexSearchBar: FC<IndexSearchBarProps> = () => {

  const hook = useIndexSearchBar();
  console.log({ hook })

  return (
    <div className="relative w-full max-w-screen-sm">
      <Input className="pr-8" placeholder="Pesquise a cidade da feira" type="autocomplete" />
      <SearchIcon className="w-5 h-5 absolute right-2 top-2" />
    </div>
  );
};
