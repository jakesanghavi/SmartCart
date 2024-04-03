import "../App.css";
import NavBar from "../components/NavBar.js";
import SearchBar from "../components/SearchBar.js";
import { supabaseService } from "../database/supabaseService.js";
import { useState, useEffect } from "react";
import styles from "./HomePage.styles.js";
import DealsItems from "../components/DealsItem/DealsItems.js";

const HomePage = () => {
  const items = localStorage.getItem("Items");
  const [cartCount, setCartCount] = useState(
    items ? JSON.parse(items).length : 0
  );
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const curr_deals = await supabaseService.getDeals();
      setDeals(curr_deals);
    };

    fetchData();
  }, []);

  return (
    <div className="HomeScreen" style={styles.container}>
      {/* Header For The Page */}
      <NavBar setCartCount={setCartCount} cartCount={cartCount} />
      {/* Search Bar */}
      <div style={styles.contentContainer}>
        <text style={styles.title}>Top Deals Today</text>
        <text style={styles.subtitle}>These items are cheaper than usual.</text>
        {deals ? (
          <DealsItems deals={deals} setCartCount={setCartCount} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default HomePage;
