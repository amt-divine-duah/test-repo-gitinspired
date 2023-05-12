import { useContext } from "react";
import useData from "../../hooks/useAssignmentData";
import "/src/App.css";
import { SearchContext } from "./SearchContext";
const Searchbar = () => {
  const data = useContext(SearchContext);

  const search: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined =
    data.search;
  return (
    <div className="action search-bar">
      <img src="/account-search.png" alt="seach-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        onChange={search}
      />
    </div>
  );
};

export default Searchbar;
