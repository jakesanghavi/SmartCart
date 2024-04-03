// DealsItems component
import React from "react";
import DealsItem from "./DealsItem.js";
import styles from "./DealsItems.styles.js"; // Notice the styles here are for the grid container

const DealsItems = ({ deals, setCartCount }) => {
  return (
    <div style={styles.gridContainer}>
      {deals.map((deal, index) => (
        <DealsItem key={index} deal={deal} setCartCount={setCartCount} />
      ))}
    </div>
  );
};

export default DealsItems;
