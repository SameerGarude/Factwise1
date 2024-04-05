import React from "react";
import "./SearchBar.scss";

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="search">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name"
      />
    </div>
  );
};

export default SearchBar;
