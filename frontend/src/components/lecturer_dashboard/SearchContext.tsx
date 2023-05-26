import React from 'react';
import { searchType } from './LecturerCustomTypes';

export const SearchContext = React.createContext<searchType>({} as searchType);

interface Child extends searchType {
  children: React.ReactNode;
}
export const SearchProvider = ({
  children,
  word,
  search,
}: // data,
Child) => {
  return <SearchContext.Provider value={{ search, word }}>{children}</SearchContext.Provider>;
};
