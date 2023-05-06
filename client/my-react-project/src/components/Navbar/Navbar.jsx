import React, { useState, useEffect } from "react";
import { FaUserAstronaut, FaHome } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import SearchBar from './SearchBar/SearchBar';
import "./navbar.scss";
import SideBar from "./SideBar/Sidebar";

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
      <SideBar className="user" />
      <SearchBar onSearch={handleSearch} />
    </nav>
  );
}

export default Navbar;