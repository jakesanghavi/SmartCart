import React from "react";

const DeleteIcon = ({ deleteItem }) => {
    const iconStyle = {
        width: 30,
        height: "auto",
        padding: "10px",
        float: "right",
        flex: 1,
        cursor: "pointer",
    };
    
    return (
        <div>
        <img
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            style={iconStyle}
            onClick={deleteItem}
        />
        </div>
    );
    }

export default DeleteIcon;