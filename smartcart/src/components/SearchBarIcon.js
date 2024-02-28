import React, { useState, useEffect } from "react";
import { supabaseService } from "../database/supabaseService.js";

const SearchBarIcon = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // The maximum number of items a search query will return
  // Note: if there are no good matches, nothing comes up, and the styling looks bad
  // WE SHOULD FIX THIS SOMEHOW!
  const maxItems = 10;

  // When the user searches, query the DB to find the most relevant results
  // MAYBE WE SHOULD LOOK INTO MAKING A LIST OF MORE GENERIC ITEMS
  // The results are often hyper-specific to brands/stores
  useEffect(() => {
    const fetchData = async () => {
      const results = await supabaseService.getItemsForSearchTerm(searchTerm);
      setSearchResults(results);
    };

    fetchData();
  }, [searchTerm]);

  // Parent container styles
  const outerContainerStyle = {
    backgroundColor: "#0A6D20",
    padding: "10px",
    borderRadius: "30px",
    width: 800,
    maxWidth: "80%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const innerContainerStyle = {
    borderSizing: "border-box",
    backgroundColor: "#D9D9D9",
    padding: "10px",
    borderRadius: "30px",
    width: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // List container styles
  const listContainerStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    padding: "10px",
    marginTop: "10px",
  };

    const listItemStyle = {
        borderBottom: '1px solid #e0e0e0',
        padding: '8px',
        color: 'black',
        cursor: 'pointer',
    };

    const handleItemClick = (itemName) => {
        // You can implement the logic to add the clicked item to the user's cart here
        console.log(`Item clicked: ${itemName}`);
        // Add your cart logic here (e.g., saving to state, database, etc.)
      };

  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <input
          type="text"
          id="search"
          name="search"
          style={{ width: 700, height: 100, fontSize: 50 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"
          style={{
            width: 100,
            height: "auto",
            padding: "10px",
            float: "right",
          }}
          alt="Magnifying Glass Icon"
        />
      </div>

      {/* List of related items. Only displays up to maxItems results, 
                and shows no results when query is empty.*/}
            {searchTerm &&
                <div style={listContainerStyle}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {searchResults.slice(0, maxItems).map((item, index) => (
                            <li key={index} style={listItemStyle} onClick={() => handleItemClick(item.name)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};

export default SearchBarIcon;
