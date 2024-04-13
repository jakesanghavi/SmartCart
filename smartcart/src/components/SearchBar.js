import React, { useState } from "react";
import styles from "./SearchBar.styles.js";
import SearchInput from "./SearchBar/SearchInput.js";
import ResultsList from "./SearchBar/ResultsList.js";

const SearchBar = ({ setCartCount, setItems }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={styles.container}>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResultsList searchTerm={searchTerm} setCartCount={setCartCount} setItems={setItems} />
    </div>
  );
};

export default SearchBar;
