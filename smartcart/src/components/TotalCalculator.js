import React, { useEffect, useState } from "react";
import { supabaseService } from "../database/supabaseService.js";
import levenshtein from "js-levenshtein"; // Assuming the file path to your string-cosine-similarity module
import '../totalCalculator.css';

const TotalCalculator = ({
    items,
    width = 500,
    height = 500,
    fontSize = 30,
}) => {
    const [storeList, setStoreList] = useState(null);

    // Function to get all unique store names from the DB
    async function getStoreNames() {
        const thing = await supabaseService.getStoreNames()
        return thing
    }

    // Get all items from a given store in the DB
    // This gets duplicates too right now -- hurts load times
    async function getStoreItems(store) {
        const storeItems = await supabaseService.storeItems(store)
        return storeItems
    }

    // Calculate the similarity between the item name in the cart and all items offered by a specific store
    // Return the single most similarly-named item
    function getSimilarity(searchTerm, storeItems) {
        // Calculate similarity score for each item
        storeItems.forEach((item) => {
            var newItem = item.items
            // Value 0 to 1 based on similarity of letters
            const similarity = 1 - levenshtein(newItem.name, searchTerm) / newItem.name.length;

            // Value 0 or 1 based on whether the item name starts with the search term
            const containsStart = searchTerm
                .toLowerCase()
                .split(" ")
                .some((word) => word.startsWith(searchTerm.toLowerCase()))
                ? 1
                : 0;

            // Final score is a weighted sum of the two similarity metrics
            newItem.score = similarity + containsStart * 0.2;
        });

        // Sort items by score
        storeItems.sort((a, b) => b.items.score - a.items.score);

        // Return just the most similar item
        return storeItems[0];
    }

    // useEffect to get the updated most similar items each time the cart updates
    // each time an item is added the algorithm is re-run on every item in the cart
    // this is wasteful computationally and I will rework this later if needed
    useEffect(() => {
        // Function to get the most similar items at EACH store for EACH item in the cart
        async function getSim() {
            // Don't run anything if nothing is in the cart
            if (items.length > 0) {
                // Get the names of stores from the DB
                let stores = await getStoreNames()

                // Initialize an empty array of carts
                // Each element will be the cart from an associated store
                var storeCarts = []

                // Iterate through each store
                for (var store in stores) {
                    // Get all items offered by that store
                    var storeItems = await getStoreItems(stores[store].id)

                    // Initialize an empty array for a cart we will make for the user from the specific store
                    // at this stage in the loop
                    var storeCart = []

                    // Iterate through all items offered by the given store
                    for (var item in items) {
                        // Get the most similar item to each search term
                        var mostSimilar = getSimilarity(items[item].name, storeItems)
                        var item_name = mostSimilar.items.name
                        var price = mostSimilar.price
                        var score = mostSimilar.items.score

                        // Append this item actually offered by the store to that stores cart
                        storeCart.push({ item_name, price, score })
                    }
                    // After iterating over each store, push each stores cart to the overall array
                    storeCarts.push(storeCart)
                }

                // Initialize an array of JS objects with two attributes: storeName and storePrice
                // These will be displayed in the recommended stores box
                var toDisplay = []

                // Iterate over each cart
                for (var cart in storeCarts) {
                    var cartItems = storeCarts[cart]

                    // Initialize a price for each store of 0 and increment to become the sum
                    // cost of all items in that store's cart
                    var storePrice = 0

                    // Iterate over all items in each cart and add to the storePrice
                    for (var storeItem in cartItems) {
                        storePrice = storePrice + cartItems[storeItem].price
                    }
                    var storeName = stores[cart].name

                    // Push the variables of interest into a new entry in toDisplay
                    toDisplay.push({ storeName, storePrice })
                }

                // Sort by price, low to high
                toDisplay.sort((a, b) => a.storePrice - b.storePrice)

                // Only show the top 5 cheapest stores
                toDisplay = toDisplay.slice(0, 5)

                // Loop through each store now and convert the messy float into a 2 decimal point $$$
                for (var d in toDisplay) {
                    toDisplay[d].storePrice = '$' + toDisplay[d].storePrice.toFixed(2)
                }
                // Update the storelist
                setStoreList(toDisplay)
            }
        }
        getSim()
    }, [items]);

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
        textAlign: "right"
      };

    return (
        <div style={containerStyle}>
            <div style={outerContainerStyle}>
                <div style={innerContainerStyle}>
                    <div style={textStyle}>
                        <p style={titleTextStyle}>Cheapest Store Recommendations</p>
                        {items.length === 0 ? (
                            // Case 1: items has 0 length, show nothing
                            null
                        ) : storeList === null ? (
                            // Case 2: firstThreeItems is null, show loading animation
                            <p style={{ animation: "bounce 0.75s infinite" }}>Loading Recommendations...</p>
                        ) : (
                            // Case 3: show the recommended stores
                            storeList.map((item, index) => (
                                <div key={index}>
                                <p>{item.storeName}: {item.storePrice}</p>
                            </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalCalculator;
