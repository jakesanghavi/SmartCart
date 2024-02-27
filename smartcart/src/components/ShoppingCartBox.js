import React from 'react';

const ShoppingCartBox = ({ width = 500, height = 500, fontSize = 30 }) => {
    const containerStyle = {
        backgroundColor: '#D9D9D9',
        padding: '20px', // Use relative units for padding
        borderRadius: '30px',
        width: `${width}px`, // Use props for width
        height: `${height}px`, // Use props for height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    };
    const textStyle = {
        fontSize: `${fontSize}px`, // Use props for font size
        fontFamily: 'Jomhuria',
        fontWeight: 'bold',
        color: 'black',
        marginTop: '10px', // Use relative units for margin
    };

    return (
        <div style={containerStyle}>
            <div style={textStyle}>
                <p style={{ margin: 0 }}>Shopping Cart</p>
            </div>
        </div>
    );
};

export default ShoppingCartBox;
