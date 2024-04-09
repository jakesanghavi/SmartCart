import React, { useState } from "react";
import styles from "./ResultsItem.styles.js";

const ResultsItem = ({ item, setCartCount, searchTerm }) => {
  const [isHovered, setIsHovered] = useState(false); // Add this line
  item.url =
    item.url ||
    "https://rankenjordan.org/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png";
  const handleItemClick = (item) => {
    let items = JSON.parse(localStorage.getItem("Items"));
    if (!items) {
      items = [];
    }

    const itemIndex = items.findIndex(existingItem => existingItem.id === item.id);

    if (itemIndex !== -1) {
      // If the item already exists, increment the quantity of existing item
      items[itemIndex].quantity += 1;
    } else {
      // If the item doesn't exist, add it to the cart
      item.quantity = 1;
      items.push(item);
    }

    localStorage.setItem("Items", JSON.stringify(items));
    setCartCount(items.length);
  };

  const dynamicContainerStyle = {
    ...styles.container,
    ...(isHovered ? styles.containerHovered : {}),
  };

  return (
    <div
      style={dynamicContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleItemClick(item)}
    >
      <img src={item.url} style={styles.image} alt='Item Visual' />
      {item.name.toLowerCase()}
    </div>
  );
};

export default ResultsItem;
