// import React, { useState } from "react";
// import { HiPlus, HiCheck } from "react-icons/hi"; // Ensure you have react-icons installed
import styles from "./DealsItem.styles.js";
// issue: the deal only corresponds to 1 store, so we do not run all the comparison to add to cart. 
// we already "searched up" this item and its store, so adding it to the cart is totally different. 
// perhaps more helpful to also display the store, and not allowing add to cart

const DealsItem = ({ deal, setCartCount }) => {
  const {
    // id,
    item_name,
    item_price,
    store_name,
    item_quantity,
    percent_price_decrease,
    cheaper_than,
    image_url,
  } = deal;

  const processPlural = (inputString) => {
    // Check if the string starts with "1 "
    if (inputString.startsWith("1 ")) {
        // If so, remove the last character (the s)
      const regex = /(weeks|days)/g;
    
      // Replace "weeks" or "days" with "week" or "day"
      let processedString = inputString.replace(regex, function(match) {
          return match.slice(0, -1);
      });

      return processedString;
    } else {
        return inputString;
    }
  }

  const cheaper_than_processed = processPlural(cheaper_than);

  // const item = {
  //   id,
  //   item_name,
  //   item_price,
  //   item_quantity,
  //   image_url,
  // };

  // const [inCart, setInCart] = useState(false);

  // const handleItemClick = (item) => {
  //   if (!inCart) {
  //     let items = JSON.parse(localStorage.getItem("Items"));
  //     if (!items) {
  //       items = [];
  //     }

  //     items.push(item);

  //     localStorage.setItem("Items", JSON.stringify(items));
  //     setCartCount(items.length);
  //     setInCart(true);
  //   } else {
  //     let items = JSON.parse(localStorage.getItem("Items"));
  //     items = items.filter((i) => i.id !== item.id);
  //     localStorage.setItem("Items", JSON.stringify(items));
  //     setCartCount(items.length);
  //     setInCart(false);
  //   }
  // };

  return (
    <div style={styles.container}>
       <div style = {styles.title}>{store_name}</div>
      {<img src={image_url} style={styles.image} alt={store_name} /> }
      <div style={styles.detail}>{item_name}</div>
     
      <div style={styles.detail}>
        Price: ${item_price} / {item_quantity} pcs
      </div>
      <div style={styles.decrease}>
        {(percent_price_decrease * 100).toFixed(0)}% Cheaper!
      </div>
      <div style={styles.cheaperThan}>Than {cheaper_than_processed}</div>
      {/* <div
        onClick={() => handleItemClick(item)}
        style={inCart ? styles.buttonInCart : styles.buttonNotInCart}
      >
        {inCart ? <HiCheck color="white" /> : <HiPlus color="green" />}
      </div> */}
    </div>
  );
};

export default DealsItem;
