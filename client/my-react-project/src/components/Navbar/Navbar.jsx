import React, { useState, useEffect } from "react";
import { FaUserAstronaut, FaBell } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import SearchBar from './SearchBar/SearchBar';
import "./navbar.scss";

function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [gameList, setGameList] = useState([]);

  const handleSearch = (query) => {
    console.log(`Searching for ${query}...`);
    // perform search logic here
  };
 

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    fontSize: "2vh",
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleGameClick = (event) => {
    setSearchInput(event.target.innerText);
    setGameList([]);
  };

  return (
    <nav className="navbar">
      <div className="navbar__icons">
        <Link to="/account" style={linkStyle}>
          <div className="user">
            <div className="user-icon">
              <FaUserAstronaut style={{ color: "yellow" }} size={30} />
            </div>
            <p className="user-name">Tom</p>
          </div>
        </Link>
        <FaBell style={{ color: "yellow", marginRight: "5vh" }} size={33} />
        <RiMessage3Fill style={{ color: "yellow" }} size={35} />
      </div>
      <SearchBar onSearch={handleSearch} />
    </nav>
  );
}

export default Navbar;