import { supabaseService } from "../../database/supabaseService.js";
import React, { useState, useEffect } from "react";
import styles from "./ResultsList.styles.js";
import ResultsItem from "./ResultsItem.js";

const ResultsList = ({ searchTerm, setCartCount }) => {
  const [searchResults, setSearchResults] = useState([]);
  const maxItems = 10;

  useEffect(() => {
    const fetchData = async () => {
      const results = await supabaseService.getItemsForSearchTerm(searchTerm);
      setSearchResults(results);
    };
    if (searchTerm !== "") {
      fetchData();
    }
  }, [searchTerm]);

  if (searchTerm.length === 0 || searchResults.length === 0) {
    return <div />;
  }

  return (
    <div style={styles.container}>
      {searchResults.slice(0, maxItems).map((item, index) => (
        <ResultsItem
          item={item}
          setCartCount={setCartCount}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};

export default ResultsList;
