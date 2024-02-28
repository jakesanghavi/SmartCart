import React from 'react';

const ShoppingCartBox = ({ width = 500, height = 500, fontSize = 30 }) => {
    const containerStyle = {
        backgroundColor: '#D9D9D9',
        padding: '20px', 
        borderRadius: '30px',
        width: `${width}px`, 
        height: `${height}px`, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    };
    const textStyle = {
        fontSize: `${fontSize}px`, 
        fontFamily: 'Jomhuria',
        fontWeight: 'bold',
        color: 'black',
        marginTop: '10px', 
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
