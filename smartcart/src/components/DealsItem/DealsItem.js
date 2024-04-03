import React from "react";
const DealsItem = ({ deal, setCartCount }) => {
  // Destructure the deal object
  const {
    id,
    item_name,
    item_price,
    item_quantity,
    percent_price_decrease,
    cheaper_than,
    image_url,
  } = deal;

  // Your code here

  return <div>{item_name}</div>;
};

export default DealsItem;
