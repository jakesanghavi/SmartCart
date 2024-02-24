import React, { useState, useEffect } from 'react';
import { supabaseService} from '../database/supabaseService.js';

const SearchBarIcon = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const results = await supabaseService.getItemsForSearchTerm(searchTerm);
            setSearchResults(results);
        };

        fetchData();
    }, [searchTerm]);

    // Parent container styles
    const outerContainerStyle = {
        backgroundColor: '#0A6D20',
        padding: '10px',
        borderRadius: '30px',
        width: 800,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const innerContainerStyle = {
        backgroundColor: '#D9D9D9',
        padding: '10px',
        borderRadius: '30px',
        width: 780,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    // List container styles
    const listContainerStyle = {
        backgroundColor: '#ffffff',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        padding: '10px',
        marginTop: '10px',
    };

    const listItemStyle = {
        borderBottom: '1px solid #e0e0e0',
        padding: '8px',
        color: 'black',
    };

    return (
        <div style={outerContainerStyle}>
            <div style={innerContainerStyle}>
                <input
                    type="text"
                    id="search"
                    name="search"
                    style={{ width: 700, height: 100, fontSize: 50 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"
                    style={{ width: 100, height: 'auto', padding: '10px', float: 'right' }}
                    alt="Magnifying Glass Icon"
                />
            </div>

            {/* List of Related Items */}
            {searchTerm &&
                <div style={listContainerStyle}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {searchResults.slice(0, 10).map((item, index) => (
                            <li key={index} style={listItemStyle}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};

export default SearchBarIcon;

