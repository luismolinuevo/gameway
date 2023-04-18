import React from 'react';

const DropdownMenu = ({ games, onGameSelect }) => {
  const handleGameSelect = (game) => {
    onGameSelect(game.name);
  };

  return (
    <div className="navbar-searchbar__dropdown">
      {games.map((game) => (
        <div
          className="navbar-searchbar__dropdown-item"
          key={game.id}
          onClick={() => handleGameSelect(game)}
        >
          <img
            src={game.box_art_url}
            alt={`Box art for ${game.name}`}
          />
          <span>{game.name}</span>
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;