import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import styles from "./CartIcon.styles.js";

const CartIcon = ({ cartCount }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // Step 1

  const handleClick = () => navigate("/cart");

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isHovered ? "#0B8733" : "#0A6D20", // Step 3
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)} // Step 2
      onMouseLeave={() => setIsHovered(false)} // Step 2
    >
      <HiShoppingCart size={60} color="white" />
      <p
        style={{
          ...styles.text,
        }}
      >
        {cartCount}
      </p>
    </div>
  );
};

export default CartIcon;
