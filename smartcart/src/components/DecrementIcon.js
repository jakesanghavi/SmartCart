import React from "react";

const DecrementIcon = ({decrementItem}) => {
    const iconStyle = {
        width: 20,
        height: "auto",
        float: "right",
        flex: 1,
        cursor: "pointer",
    };
    const textStyle = {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    };

    const handleDecrement = () => {
        console.log("Decrementing item");
        if (decrementItem) {
            decrementItem();
        }
    };
    
    return (
        <div style={iconStyle} onClick={handleDecrement}>
            <div style={textStyle}>
                -
            </div>
        </div>
    );
    }

export default DecrementIcon;