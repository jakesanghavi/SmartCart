import React from "react";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  var cartCount = 0;
  const navigate = useNavigate(); // Hook to get navigate function

  const containerStyle = {
    backgroundColor: "#0A6D20",
    padding: 10,
    borderRadius: "30px",
    width: "260px",
    height: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    float: "right",
    alignItems: "center",
    addEventListener: "click",
  };
  const iconStyle = {
    width: 100,
    height: "auto",
    padding: "10px",
    float: "left",
    flex: 1,
  };
  const cartQuantityStyle = {
    fontSize: 50,
    textAlign: 'right',
    fontFamily: 'Courier',
    fontWeight : 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    height: '50px',
  };
  const cartContainerStyle = {
    width: 100,
    height: "auto",
    padding: "10px",
  }

// return (
// <div style = {containerStyle}>
//     <div style={cartTextStyle}>
//         <p>Cart</p>
//     </div>
//     <div style = {cartContainerStyle}>
//         <img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" style={iconStyle}/>
//     <div style = {cartQuantityStyle}>
//         <p>{cartCount}</p>
//     </div>
//     </div>

  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={cartContainerStyle}>
      <img
          src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png"
          style={iconStyle}
          alt="Shopping Cart Icons"
        />
      </div>
      <div>
        <div style = {cartQuantityStyle}>
          <p>{cartCount}</p>
        </div>
      </div>
    </div>
  );
};

export default CartIcon;
