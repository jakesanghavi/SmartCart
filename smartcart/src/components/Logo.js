import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate(); // Hook to get navigate function

  const containerStyle = {
    backgroundColor: "#0A6D20",
    padding: "10px",
    borderRadius: "30px",
    width: 300,
    height: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const textStyle = {
    fontSize: 55,
    textAlign: "center",
    fontFamily: "Jomhuria",
    fontWeight: "bold",
    color: "white",
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={textStyle}>
        <p>$martCart</p>
      </div>
    </div>
  );
};

export default Logo;
