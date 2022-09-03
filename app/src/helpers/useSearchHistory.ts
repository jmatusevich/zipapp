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
      setSearchHistory((history) => [item, ...history].slice(0, 5));
    },
    [setSearchHistory]
  );

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  useEffect(() => {
    if (initialized)
      localStorage.setItem("search_history", JSON.stringify(searchHistory));
  }, [searchHistory, initialized]);

  return [searchHistory, addToHistory, clearHistory] as const;
}
