import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseService } from "../database/supabaseService.js";
import levenshtein from "js-levenshtein"; // Assuming the file path to your string-cosine-similarity module

const TotalCalculator = ({
    items,
    width = 500,
    height = 500,
    fontSize = 30,
}) => {

    const [storeList, setStoreList] = useState(null);

    // const a = getUniqueValues();
    async function getStoreNames() {
        const thing = await supabaseService.getStoreNames()
        return thing
    }

    async function getVals(b) {
        const t = await supabaseService.storeItems(b)
        return t
    }

    function getSimilarity(searchTerm, storeItems) {
        // calculate score for each item
        storeItems.forEach((item) => {
            var item = item.items
            // Value 0 to 1 based on similarity of letters
            const similarity = 1 - levenshtein(item.name, searchTerm) / item.name.length;

            // Value 0 or 1 based on whether the item name starts with the search term
            const containsStart = searchTerm
                .toLowerCase()
                .split(" ")
                .some((word) => word.startsWith(searchTerm.toLowerCase()))
                ? 1
                : 0;

            item.score = similarity + containsStart * 0.2;
        });

        // sort items by score
        storeItems.sort((a, b) => b.items.score - a.items.score);

        // remove score from items
        // storeItems.forEach((item) => delete item.score);

        return storeItems;
    }

    useEffect(() => {
        async function getSim() {
            if (items.length > 0) {
                let stores = await getStoreNames()
                var storeCarts = []
                for (var store in stores) {
                    var storeItems = await getVals(stores[store].id)
                    var storeCart1 = []
                    for (var item in items) {
                        var similarity = getSimilarity(items[item].name, storeItems)[0]
                        var item_name = similarity.items.name
                        var price = similarity.price
                        var score = similarity.items.score
                        storeCart1.push({ item_name, price, score })
                    }
                    storeCarts.push(storeCart1)
                }

                var toDisplay = []
                for (var cart in storeCarts) {
                    var cartItems = storeCarts[cart]
                    var price = 0
                    for (var storeItem in cartItems) {
                        price = price + cartItems[storeItem].price
                    }
                    var storeName = stores[cart].name
                    toDisplay.push({ storeName, price })
                }
                toDisplay.sort((a, b) => a.price - b.price)
                toDisplay = toDisplay.slice(0, 5)
                for (var d in toDisplay) {
                    toDisplay[d].price = '$' + toDisplay[d].price.toFixed(2)
                }
                setStoreList(toDisplay)
            }
        }
        getSim()
    }, [items]);

    const navigate = useNavigate();

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
    const textStyle = {
        fontSize: `${fontSize}px`,
        fontFamily: "Jomhuria",
        fontWeight: "bold",
        color: "black",
        marginTop: "10px",
    };

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div style={containerStyle}>
            <div style={outerContainerStyle}>
                <div style={innerContainerStyle}>
                    <div style={textStyle}>
                        <p style={{ margin: 0 }}>Recommended Stores</p>
                        {storeList.map((item, index) => (
                            <div key={index}>
                                <p>{item.storeName}: {item.price}</p>
                            </div>
                        ))}{" "}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalCalculator;
