import Logo from "./NavBar/Logo.js";
import CartIcon from "./NavBar/CartIcon.js";
import styles from "./NavBar.styles.js";
import SearchBar from "./SearchBar.js";

const NavBar = ({ cartCount, setCartCount, setItems }) => {
  return (
    <div style={styles.container}>
      <div style={styles.leftContainer}>
        <Logo />
      </div>
      <SearchBar setCartCount={setCartCount} setItems={setItems}/>
      <div style={styles.rightContainer}>
        <CartIcon cartCount={cartCount} />
      </div>
    </div>
  );
};

export default NavBar;
