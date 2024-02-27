import "../App.css";
import CartIcon from "../components/CartIcon.js";
import Logo from "../components/Logo.js";
import SearchBarIcon from "../components/SearchBarIcon.js";

const HomePage = () => {
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
        <CartIcon />
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
        <SearchBarIcon />
      </div>
    </div>
  );
};

export default HomePage;
