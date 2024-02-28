import "../App.css";
import CartIcon from "../components/CartIcon.js";
import Logo from "../components/Logo.js";
import SearchBarIcon from "../components/SearchBarIcon.js";
import { useState } from "react";

const HomePage = () => {
  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem("Items")).length || 0
  );

  return (
    <div
      className="HomeScreen"
      style={{
        height: "100vh",
        width: "100vw",
        alignItems: "flex-start",
        backgroundColor: "#3BB6EB",
      }}
    >
      {/* Header For The Page */}
      <div
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "125px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Logo />
        <CartIcon cartCount={cartCount} />
      </div>
      {/* Search Bar */}
      <div
        style={{
          width: "100%",
          paddingTop: "15%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <SearchBarIcon setCartCount={setCartCount} />
      </div>
    </div>
  );
};

export default HomePage;
