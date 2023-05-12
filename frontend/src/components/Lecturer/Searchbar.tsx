import "/src/App.css"
const Searchbar = () => {
    return (
      <div className="action search-bar">
        <img src="/account-search.png" alt="seach-icon" />
        <input type="text" className="search-input" placeholder="Search" />
      </div>
    );
  };
  
  export default Searchbar;
  