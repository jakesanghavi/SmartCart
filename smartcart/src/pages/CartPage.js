import "../App.css";
import ShoppingCartBox from "../components/ShoppingCartBox.js";
import TotalCalculator from "../components/TotalCalculator.js";

const CartPage = () => {
  let items = localStorage.getItem("Items");
  items = items ? JSON.parse(items) : [];

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
      <TotalCalculator items={items}/>
    </div>
  );
};

export default CartPage;
