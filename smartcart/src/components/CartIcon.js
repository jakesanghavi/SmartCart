import React from "react";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const navigate = useNavigate(); // Hook to get navigate function

  const containerStyle = {
    backgroundColor: "#0A6D20",
    padding: 10,
    borderRadius: "30px",
    width: "300px",
    height: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    float: "right",
    alignItems: "center",
    addEventListener: "click",
  };
  const textStyle = {
    fontSize: 60,
    textAlign: "right",
    padding: 10,
    fontFamily: "Jomhuria",
    fontWeight: "bold",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };
  const iconStyle = {
    width: 100,
    height: "auto",
    padding: "10px",
    float: "left",
    flex: 1,
  };
  const cartTextStyle = {
    fontSize: 60,
    textAlign: 'right',
    fontFamily: 'Jomhuria',
    fontWeight : 'bold',
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    height: '100px',
    marginLeft: '20px',
  };
  const cartQuantityStyle = {
    fontSize: 40,
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
    height: '150px',
    width: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
      <div style={textStyle}>
        <p>Cart</p>
      </div>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png"
          style={iconStyle}
          alt="Shopping Cart Icons"
        />
      </div>
    </div>
  );
};

export default CartIcon;
