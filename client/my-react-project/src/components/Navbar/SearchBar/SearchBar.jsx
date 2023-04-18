import React, { useState } from 'react';
import axios from 'axios';
import DropdownMenu from './DropdownMenu/DropdownMenu';
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleQueryChange = async (event) => {
    const query = event.target.value;
    setQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(`https://api.twitch.tv/helix/games?name=${query}`, {
          headers: {
            "Client-ID": "0g6f402c17u79hmds4hhynnifsr4od",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setGames(response.data.data);
        setShowDropdown(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setGames([]);
      setShowDropdown(false);
    }
  };

  const handleGameSelect = (gameName) => {
    setQuery(gameName);
    setShowDropdown(false);
    onSearch(gameName);
  };

  return (
    <div className="navbar-searchbar">
      <input
        type="text"
        placeholder="Search for games..."
        value={query}
        onChange={handleQueryChange}
      />
      {showDropdown && (
        <DropdownMenu games={games} onGameSelect={handleGameSelect} />
      )}
    </div>
  );
};

export default SearchBar;