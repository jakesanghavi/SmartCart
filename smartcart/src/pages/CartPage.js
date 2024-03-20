import React, { useState } from "react";
import "../App.css";
import ShoppingCartBox from "../components/ShoppingCartBox.js";
import TotalCalculator from "../components/TotalCalculator.js";
import styles from "./CartPage.styles.js";

const CartPage = () => {
  const [items, setItems] = useState(
    localStorage.getItem("Items")
      ? JSON.parse(localStorage.getItem("Items"))
      : []
  );

  return (
    <div className="CartScreen" style={styles.container}>
      <ShoppingCartBox items={items} setItems={setItems} />
      <TotalCalculator items={items} />
    </div>
  );
};

export default CartPage;
