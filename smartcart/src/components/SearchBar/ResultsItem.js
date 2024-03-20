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
    // Ensure text is treated as a whole in lowercase for matching purposes
    const lowerCaseText = text.toLowerCase();
    const lowerCaseHighlight = highlight.toLowerCase();

    const parts = lowerCaseText.split(
      new RegExp(`(${lowerCaseHighlight})`, "gi")
    );

    return parts.map((part, i) => {
      const style =
        part.toLowerCase() === lowerCaseHighlight
          ? styles.normalText
          : styles.boldText;

      // Wrap part in a span, using `pre-wrap` to preserve white spaces and line breaks
      return (
        <span key={i} style={{ ...style, ...styles.text }}>
          {part}
        </span>
      );
    });
  };

  return (
    <div style={styles.container} onClick={() => handleItemClick(item)}>
      {getHighlightedText(item.name.toLowerCase(), searchTerm)}
    </div>
  );
};

export default ResultsItem;
