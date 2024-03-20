import React from "react";
import styles from "./ResultsItem.styles.js";

const ResultsItem = ({ item, setCartCount, searchTerm }) => {
  const handleItemClick = (item) => {
    let items = JSON.parse(localStorage.getItem("Items"));
    if (!items) {
      items = [];
    }

    items.push(item);

    localStorage.setItem("Items", JSON.stringify(items));
    setCartCount(items.length);
  };

  // Function to split item.name into parts based on searchTerm, ensuring all text is lowercase
  const getHighlightedText = (text, highlight) => {
    // Avoid processing if highlight is empty, return the entire text
    if (!highlight.trim()) {
      return <span style={styles.text}>{text}</span>;
    }

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    // Create a non-breaking space entity for leading or trailing spaces in parts
    const preserveSpace = (part) => part.replace(/ /g, "\u00A0");

    return parts.map((part, i) => {
      // Check if the part is a highlight
      const isHighlight = part.toLowerCase() === highlight.toLowerCase();

      // Apply normal or bold style based on whether the part matches the highlight
      const textStyle = isHighlight ? styles.normalText : styles.boldText;

      // Use preserveSpace function to handle leading/trailing spaces
      return (
        <span key={i} style={{ ...textStyle, ...styles.text }}>
          {isHighlight ? part : preserveSpace(part)}
        </span>
      );
    });
  };

  return (
    <div style={styles.container} onClick={() => handleItemClick(item)}>
      {getHighlightedText(item.name.toLowerCase(), searchTerm.toLowerCase())}
    </div>
  );
};

export default ResultsItem;
