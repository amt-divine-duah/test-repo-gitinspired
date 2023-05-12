import React from "react";

export interface searchType {
    search: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    word: string;
}

export const SearchContext = React.createContext<searchType>({} as searchType);

interface Child extends searchType {
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