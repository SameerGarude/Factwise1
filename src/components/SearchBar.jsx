import React from "react";
import "./SearchBar.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

// const element = <FontAwesomeIcon icon={byPrefixAndName.fas["house"]} />;

const SearchBar = ({ handleSearch }) => {
  return (
    <>
      <FontAwesomeIcon icon={faSearch} />
      <div className="search">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name"
        />
      </div>
    </>
  );
};

export default SearchBar;
