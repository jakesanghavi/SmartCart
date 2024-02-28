import "../App.css";
import ShoppingCartBox from "../components/ShoppingCartBox.js";
import { useEffect } from "react";

const CartPage = () => {
  let items = JSON.parse(localStorage.getItem("Items"));

  useEffect(() => {
    items = JSON.parse(localStorage.getItem("Items"));
  }, []);

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
      <ShoppingCartBox items={items} />
    </div>
  );
};

export default CartPage;
