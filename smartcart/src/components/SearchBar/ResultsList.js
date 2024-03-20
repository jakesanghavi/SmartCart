import { supabaseService } from "../../database/supabaseService.js";
import React, { useState, useEffect } from "react";
import styles from "./ResultsList.styles.js";
import ResultsItem from "./ResultsItem.js";

const ResultsList = ({ searchTerm, setCartCount }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const maxItems = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingResults(true);
      const results = await supabaseService.getItemsForSearchTerm(searchTerm);
      setSearchResults(results);
      setIsLoadingResults(false);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div style={styles.container}>
      {isLoadingResults && <p style={styles.text}>Loading results...</p>}
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
