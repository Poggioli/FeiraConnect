import { useSearchCityByName } from "@/services/searchCityByName/searchCityByName";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export function useIndexSearchBar() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const service = useSearchCityByName(
    { query: searchTerm },
    { enabled: false }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      searchCity()
    }
  }

  const searchCity = () => {
    if(searchTerm) {
      setOpen(true);
      service.fetchNextPage();
    }
  }

  return {
    open,
    setOpen,
    handleChange,
    handleKeyDown,
    searchTerm,
    service,
    searchCity
  };
}
