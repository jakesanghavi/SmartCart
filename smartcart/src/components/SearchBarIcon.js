import React, {Component} from 'react';

const SearchBarIcon = () => {
    const outerContainerStyle = {
        backgroundColor: '#0A6D20',
        padding: '10px',
        borderRadius: '30px',
        width: 800,
        height: 200,
        flexDirection: 'row',
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const innerContainerStyle = {
        backgroundColor: '#D9D9D9',
        padding: '10px',
        borderRadius: '30px',
        width: 780,
        height: 180,
        flexDirection: 'row',
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style = {outerContainerStyle}>
            <div style = {innerContainerStyle}>
                <input type="text" id="search" name="search" style={{width: 700, height: 100, fontSize: 50}}/>
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png" style={{width: 100, height: 'auto', padding: '10px', float: 'right'}}/>
            </div>
        </div>
    );
}

export default SearchBarIcon;