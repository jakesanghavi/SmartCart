import React, { useState } from "react"; // Import useState
import { HiMagnifyingGlass } from "react-icons/hi2";
import styles from "./SearchInput.styles.js";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={isFocused ? styles.containerFocused : styles.container}>
      <HiMagnifyingGlass size={40} color={"#616161"} />
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search your favorite products"
        style={styles.input} // Remove default focus style
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)} // Set focus state to true when input is focused
        onBlur={() => setIsFocused(false)} // Set focus state to false when input loses focus
      />
    </div>
  );
};

export default SearchInput;
