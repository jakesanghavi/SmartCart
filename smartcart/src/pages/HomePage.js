import "../App.css";
import NavBar from "../components/NavBar.js";
import SearchBar from "../components/SearchBar.js";
import { supabaseService } from "../database/supabaseService.js";
import { useState, useEffect } from "react";
import styles from "./HomePage.styles.js";
import DealsItem from "../components/DealsItem/DealsItem.js";

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
        {deals.map((deal, index) => (
          <DealsItem deal={deal} setCartCount={setCartCount} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
