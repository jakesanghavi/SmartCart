import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logo.styles.js";

const Logo = () => {
  const navigate = useNavigate(); // Hook to get navigate function

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <div style={styles.text}>
        <p>$martCart</p>
      </div>
    </div>
  );
};

export default Logo;
