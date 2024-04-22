import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../components/DeleteIcon.js";
import IncrementIcon from "../components/IncrementIcon.js";
import DecrementIcon from "../components/DecrementIcon.js";
import QuantityDisplay from "../components/QuantityDisplay.js";
import { IoArrowBackOutline } from "react-icons/io5";

const ShoppingCartBox = ({
  items,
  setItems,
  width = 500,
  height = 500,
  fontSize = 30,
  defaultQuantity = 1,
}) => {

  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorage.getItem("Items");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      // Ensure each item has a quantity property
      const updatedItems = parsedItems.map(item => ({
        ...item,
        quantity: item.quantity || defaultQuantity
      }));
      setItems(updatedItems);
    } else {
      setItems([]);
    }
  }, [defaultQuantity, setItems]);
  


  const containerStyle = {
    width: '100vw',
    height: '100vh',
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };
  const outerContainerStyle = {
    display: "flex",
    flex: 2 / 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: '540px',
    height: '530px',
    backgroundColor: "#0A6D20",
    padding: "10px",
    borderRadius: "30px",
  };
  const backButtonContainerStyle = {
    flex: 1 / 6,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "150px",
    height: "150px",
    backgroundColor: "#0A6D20",
    borderRadius: "30px",
    addEventListener: "click",
  };
  const innerContainerStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "30px",
    width: `${width}px`,
    height: `${height}px`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  };
  const titleTextStyle = {
    fontSize: `${fontSize + 20}px`,
    fontWeight: "bold",
    color: "black",
    marginTop: "10px",
  };
  const textStyle = {
    fontSize: `${fontSize}px`,
    color: "black",
    marginTop: "10px",
  };

  const handleClick = () => {
    navigate("/");
  };

  const deleteItem = (index) => {

    // Avoid modifying the original state directly
    const updatedItems = items.slice();
    updatedItems.splice(index, 1);
    setItems(updatedItems)

    // Update localStorage with the new array
    localStorage.setItem("Items", JSON.stringify(updatedItems));
  };

  const decrementItem = (index) => {
    const updatedItems = [...items]; // Create a copy of the array
    if (updatedItems[index].quantity > 1) { // Ensure quantity is greater than 1
      updatedItems[index].quantity--; // Decrement quantity by 1
      setItems(updatedItems);
      localStorage.setItem("Items", JSON.stringify(updatedItems));
    }
  };

  const incrementItem = (index) => {
    const updatedItems = [...items]; // Create a copy of the array
    updatedItems[index].quantity++; // Increment quantity by 1
    setItems(updatedItems);
    localStorage.setItem("Items", JSON.stringify(updatedItems));
  };

  return (
    <div style = {containerStyle}>
      <div style={backButtonContainerStyle} onClick = {handleClick}>
        <IoArrowBackOutline size={80} color="white" />
      </div>
      <div style={outerContainerStyle}>
        <div style={innerContainerStyle}>
          <div style={titleTextStyle}>
            <p style={{ margin: 0 }}>Shopping Cart</p>
          </div>
          <div style={textStyle}>
            {items.map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <p style={{ margin: 0, marginRight: "10px" }}>{item.name}</p>
                <DeleteIcon deleteItem={() => deleteItem(index)} />
                <DecrementIcon decrementItem={() => decrementItem(index)} />
                <QuantityDisplay quantity={item.quantity} />
                <IncrementIcon incrementItem={() => incrementItem(index)} />
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartBox;
