import React, {Component} from 'react';

const Logo = () => {
    const containerStyle = {
        backgroundColor: '#0A6D20',
        padding: '10px',
        borderRadius: '30px',
        width: 300,
        height: 150,
        flexDirection: 'row',
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const textStyle = {
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'Jomhuria',
        fontWeight : 'bold',
        color: 'white',
    };

    return (
        <div style = {containerStyle}>
            <div style={textStyle}>
                <p>$martCart</p>
            </div>
        </div>
        );
    }

export default Logo;