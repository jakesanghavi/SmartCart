import React, {Component, useState} from 'react';

function CartIcon({cartItems}){
  var cartCount = 0;

  if(cartItems){
    cartCount = cartItems.length;
  }

    const containerStyle = {
        backgroundColor: '#0A6D20',
        padding: '10px',
        borderRadius: '30px',
        width: '300px',
        height: '150px',
        flexDirection: 'row',
        display : 'flex',
        alignItems: 'center',
        addEventListener: 'click',
      };
      const cartTextStyle = {
        fontSize: 60,
        textAlign: 'right',
        fontFamily: 'Jomhuria',
        fontWeight : 'bold',
        // flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        height: '100px',
        marginLeft: '20px',
      };
      const cartQuantityStyle = {
        fontSize: 40,
        textAlign: 'right',
        fontFamily: 'Courier',
        fontWeight : 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        height: '50px',
      };
      const iconStyle = {
        width: 100,
        height: 'auto',

      };
      const cartContainerStyle = {
        height: '150px',
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }

    return (
    <div style = {containerStyle}>
        <div style={cartTextStyle}>
            <p>Cart</p>
        </div>
        <div style = {cartContainerStyle}>
            <img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" style={iconStyle}/>
        <div style = {cartQuantityStyle}>
            <p>{cartCount}</p>
        </div>
        </div>
    </div>
    );
}

export default CartIcon;