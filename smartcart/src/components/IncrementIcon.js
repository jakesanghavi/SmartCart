import React from "react";

const IncrementIcon = ({incrementItem}) => {
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

    const handleIncrement = () => {
        if (incrementItem) {
            incrementItem();
        }
    };
    
    return (
        <div style={iconStyle} onClick = {handleIncrement}>
            <div style={textStyle}>
                +
            </div>
        </div>
    );
    }

export default IncrementIcon;