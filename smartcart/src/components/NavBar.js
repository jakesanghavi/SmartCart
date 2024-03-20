import Logo from "./NavBar/Logo.js";
import CartIcon from "./NavBar/CartIcon.js";
import styles from "./NavBar.styles.js";

const NavBar = ({ cartCount }) => {
  return (
    <div style={styles.container}>
      <Logo />
      <CartIcon cartCount={cartCount} />
    </div>
  );
};

export default NavBar;
