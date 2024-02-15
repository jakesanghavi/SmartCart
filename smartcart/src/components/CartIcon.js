import React, {Component} from 'react';

const CartIcon = () => {
    const containerStyle = {
        backgroundColor: '#0A6D20',
        padding: '10px',
        borderRadius: '30px',
        width: '300px',
        height: '120px',
        flexDirection: 'row',
        display : 'flex',
        justifyContent: 'center',
        float : 'right',
        alignItems: 'center',
      };
      const textStyle = {
        fontSize: 60,
        textAlign: 'right',
        padding: 10,
        fontFamily: 'Jomhuria',
        fontWeight : 'bold',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
      const iconStyle = {
        width: 100,
        height: 'auto',
        padding: '10px',
        float: 'left',
        flex: 1,
      };

    return (
    <div style = {containerStyle}>
        <div style={textStyle}>
            <p>Cart</p>
        </div>
        <div>
            <img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" style={iconStyle}/>
        </div>
    </div>
    );
}

export default CartIcon;