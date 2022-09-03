import { useCallback, useEffect, useState } from "react";
import { ZipCodeDetails } from "../graphql/types/getZipCodeDetailsTypes";

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<ZipCodeDetails[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    const retrievedData = localStorage.getItem("search_history");
    if (retrievedData) {
      const parsedItems = JSON.parse(retrievedData);
      if (parsedItems) {
        setSearchHistory(parsedItems);
      }
    }
    setInitialized(true);
  }, []);

  const addToHistory = useCallback(
    (item: ZipCodeDetails) => {
      setSearchHistory([item, ...searchHistory].slice(0, 5));
    },
    [searchHistory, setSearchHistory]
  );

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [searchHistory, setSearchHistory]);

  useEffect(() => {
    if (initialized)
      localStorage.setItem("search_history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return [searchHistory, addToHistory, clearHistory] as const;
}
