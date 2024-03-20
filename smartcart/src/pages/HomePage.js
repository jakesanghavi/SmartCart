import "../App.css";
import NavBar from "../components/NavBar.js";
import SearchBar from "../components/SearchBar.js";
import { useState } from "react";
import styles from "./HomePage.styles.js";

const HomePage = () => {
  const items = localStorage.getItem("Items");
  const [cartCount, setCartCount] = useState(
    items ? JSON.parse(items).length : 0
  );

  return (
    <div className="HomeScreen" style={styles.container}>
      {/* Header For The Page */}
      <NavBar cartCount={cartCount} />
      {/* Search Bar */}
      <div style={styles.contentContainer}>
        <SearchBar setCartCount={setCartCount} />
      </div>
    </div>
  );
};

export default HomePage;
