import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../components/DeleteIcon.js";

const ShoppingCartBox = ({
  items,
  setItems,
  width = 500,
  height = 500,
  fontSize = 30,
}) => {

  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorage.getItem("Items");
    items = storedItems ? JSON.parse(storedItems) : [];
  }, []);


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
    backgroundColor: "#D9D9D9",
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
    fontFamily: "Courier",
    fontWeight: "bold",
    color: "black",
    marginTop: "10px",
  };
  const textStyle = {
    fontSize: `${fontSize}px`,
    fontFamily: "Courier",
    color: "black",
    fontWeight: "bold",
    marginTop: "10px",
  };

  const handleClick = () => {
    navigate("/");
  };

  const deleteItem = (index) => {
    console.log("Deleting item at index", index);
    console.log(items)

    // Avoid modifying the original state directly
    const updatedItems = items.slice();
    updatedItems.splice(index, 1);
    // console.log(updatedItems)
    // items = updatedItems;
    setItems(updatedItems)

    // Update localStorage with the new array
    localStorage.setItem("Items", JSON.stringify(updatedItems));
  };

  return (
    <div style = {containerStyle}>
      <div style={backButtonContainerStyle} onClick = {handleClick}>
        <img src="https://static-00.iconduck.com/assets.00/arrow-go-back-icon-2048x1821-lu8m3223.png" alt="back" style={{width: "100px", height: "100px"}}/>
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
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartBox;
