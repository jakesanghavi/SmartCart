import React, {useState} from "react";
import "../App.css";
import ShoppingCartBox from "../components/ShoppingCartBox.js";
import TotalCalculator from "../components/TotalCalculator.js";

const CartPage = () => {
  const [items, setItems] = useState(localStorage.getItem("Items") ? JSON.parse(localStorage.getItem("Items")) : []);

  return (
    <div
      className="CartScreen"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#3BB6EB",
      }}
    >
      <ShoppingCartBox items={items} setItems={setItems}/>
      <TotalCalculator items={items}/>
    </div>
  );
};

export default CartPage;
