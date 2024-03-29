import React from "react"

const QuantityDisplay = ({ quantity }) => {
    const textStyle = {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        padding: "10px",
    };

    return (
        <div style={textStyle}>
            {quantity}
        </div>
    );
}

export default QuantityDisplay;