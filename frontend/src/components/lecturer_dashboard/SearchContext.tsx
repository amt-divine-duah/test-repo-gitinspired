import React from "react";
import { SearchType } from "./LecturerCustomTypes";

export const SearchContext = React.createContext<SearchType>({} as SearchType);

interface Child extends SearchType {
  children: React.ReactNode;
}
export const SearchProvider = ({
    children,
  word,
  search,
  // data,
}: Child) => {
  return (
    <SearchContext.Provider
      value={{ search, word}}
    >
      {children}
    </SearchContext.Provider>
  );
};