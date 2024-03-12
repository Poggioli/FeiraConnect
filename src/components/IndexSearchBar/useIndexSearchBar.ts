import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export function useIndexSearchBar() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  useEffect(() => {
    console.log(debouncedSearchTerm);
    setOpen(!!debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleOnFocus = () => {
    setOpen(!!searchTerm);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return {
    open,
    setOpen,
    handleChange,
    handleOnFocus,
    searchTerm,
  };
}
