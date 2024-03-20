import React, { useState } from "react";
import styles from "./SearchBar.styles.js";
import SearchInput from "./SearchBar/SearchInput.js";
import ResultsList from "./SearchBar/ResultsList.js";

const SearchBar = ({ setCartCount }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={styles.container}>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResultsList searchTerm={searchTerm} setCartCount={setCartCount} />
    </div>
  );
};

export default SearchBar;
