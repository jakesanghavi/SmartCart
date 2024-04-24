import React, { useEffect, useState, useRef } from "react";
import { supabaseService } from "../database/supabaseService.js";
import '../totalCalculator.css';

const TotalCalculator = ({
    items,
    width = 500,
    height = 500,
    fontSize = 30,
}) => {
    const [storeList, setStoreList] = useState(null);
    const timerRef = useRef(null);

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

    async function getSimilarity(name) {
        const similarItems = await supabaseService.getSimilar(name);
        return similarItems
    }

    // useEffect to get the updated most similar items each time the cart updates
    // each time an item is added the algorithm is re-run on every item in the cart
    // this is wasteful computationally and I will rework this later if needed
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        // Prevent random null POSTs or ones without a user
        // Also, no need to update stats if they are empty. This constraint fixes bugs
        // Set a timer as otherwise there are too many POSTs which can make users push
        // stats to a song more than once
        timerRef.current = setTimeout(() => {
            // Function to get the most similar items at EACH store for EACH item in the cart
            async function getSim() {
                // Don't run anything if nothing is in the cart
                setStoreList(null)
                if (items !== null && items.length > 0) {
                    // Get the names of stores from the DB
                    let stores = await getStoreNames()
                    console.log(stores)

                    // Initialize an empty array of carts
                    // Each element will be the cart from an associated store
                    var storeCarts = []

                    // Iterate through each store
                    for (var store in stores) {
                        // Get all items offered by that store
                        var storeItems = await getStoreItems(stores[store].id)
                        console.log(stores[store])
                        storeItems = Array.from(new Set(storeItems.map(obj => obj.items.name))).map(name => storeItems.find(obj => obj.items.name === name));
                        var itemNames = [];

                        // Iterate over each object in storeItems
                        storeItems.forEach(obj => {
                            // Check if the object has the 'items' property
                            // console.log(obj)
                            if (obj.hasOwnProperty('items')) {
                                if (obj.items.hasOwnProperty('name')) {
                                    itemNames.push(obj.items.name);
                                }
                            }
                            // Iterate over each item in the 'items' array and extract the 'name' attribute                        }
                        });

                        if (!storeItems || storeItems.length === 0) {
                            continue;
                        }

                        // Initialize an empty array for a cart we will make for the user from the specific store
                        // at this stage in the loop
                        var storeCart = []

                        for (var item in items) {
                            var mostSimilar = await getSimilarity(items[item].name)
                            mostSimilar = mostSimilar[0].items;

                            // Iterate through all items offered by the given store
                            for (var similar in mostSimilar) {
                                // Get the most similar item to each search term

                                if (itemNames.includes(mostSimilar[similar])) {
                                    // const index = storeItems.findIndex(obj => obj.items && obj.items.hasOwnProperty('name') && obj.items.name === similar);
                                    const index = itemNames.indexOf(mostSimilar[similar])
                                    var product = storeItems[index]
                                    var item_name = product.items.name
                                    var price = product.price
                                    var quantity = items[item].quantity

                                    // Append this item actually offered by the store to that stores cart
                                    storeCart.push({ item_name, price, quantity })
                                    break;
                                }

                            }

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
                            storePrice = storePrice + cartItems[storeItem].price * cartItems[storeItem].quantity
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
        }, 100); // Adjust the delay as needed
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
        textAlign: "center"
    };
    const textStyle = {
        fontSize: `${fontSize}px`,
        color: "black",
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
