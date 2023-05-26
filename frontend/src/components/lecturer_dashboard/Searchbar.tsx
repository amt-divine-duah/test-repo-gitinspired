import { useContext } from "react";
import { SearchContext } from "./SearchContext";

const Searchbar = () => {
  const data = useContext(SearchContext);
  const search: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined = data.search;
  return (
    <div className='action searchbar'>
      <img src='/account-search.png' alt='search icon' />
      <input type='text' className='search-input' placeholder='Search' 
        onChange={search}/>
    </div>
  );
};

export default Searchbar;
