import "../App.css";
import ShoppingCartBox from "../components/ShoppingCartBox.js";

const CartPage = () => {
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
      <ShoppingCartBox/>
    </div>
  );
};

export default CartPage;
