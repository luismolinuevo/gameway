import React, { useState } from 'react';
import Dropdown from './Dropdown';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value;
    setQuery(query);
    onSearch(query);
  };

  return (
    <div className="navbar-searchbar">
      <input
        type="text"
        placeholder="Search for games..."
        value={query}
        onChange={handleInputChange}
      />
      <Dropdown query={query} />
    </div>
  );
};

export default SearchBar;