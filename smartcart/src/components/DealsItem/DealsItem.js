import React, { useState } from "react";
import { HiPlus, HiCheck } from "react-icons/hi"; // Ensure you have react-icons installed
import styles from "./DealsItem.styles.js";

const DealsItem = ({ deal, setCartCount }) => {
  const {
    id,
    item_name,
    item_price,
    item_quantity,
    percent_price_decrease,
    cheaper_than,
    image_url,
  } = deal;

  const item = {
    id,
    item_name,
    item_price,
    item_quantity,
    image_url,
  };

  const [inCart, setInCart] = useState(false);

  const handleItemClick = (item) => {
    if (!inCart) {
      let items = JSON.parse(localStorage.getItem("Items"));
      if (!items) {
        items = [];
      }

      items.push(item);

      localStorage.setItem("Items", JSON.stringify(items));
      setCartCount(items.length);
      setInCart(true);
    } else {
      let items = JSON.parse(localStorage.getItem("Items"));
      items = items.filter((i) => i.id !== item.id);
      localStorage.setItem("Items", JSON.stringify(items));
      setCartCount(items.length);
      setInCart(false);
    }
  };

  return (
    <div style={styles.container}>
      <img src={image_url} style={styles.image} alt={item_name} />
      <div style={styles.title}>{item_name}</div>
      <div style={styles.detail}>
        Price: ${item_price} / {item_quantity} pcs
      </div>
      <div style={styles.decrease}>
        {(percent_price_decrease * 100).toFixed(0)}% Cheaper!
      </div>
      <div style={styles.cheaperThan}>Than {cheaper_than}</div>
      <div
        onClick={() => handleItemClick(item)}
        style={inCart ? styles.buttonInCart : styles.buttonNotInCart}
      >
        {inCart ? <HiCheck color="white" /> : <HiPlus color="green" />}
      </div>
    </div>
  );
};

export default DealsItem;
