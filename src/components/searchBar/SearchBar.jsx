import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div
      className="search-bar-container"
      style={props?.isSearchBar ? { margin: "1.2rem auto" } : {}}
    >
      <input
        type="text"
        placeholder="Search"
        className="search-bar"
        value={searchTerm}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <i className="fa fa-search search-icon"></i>
    </div>
  );
};

export default SearchBar;
