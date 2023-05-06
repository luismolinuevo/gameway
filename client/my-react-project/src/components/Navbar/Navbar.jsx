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
      <div className="navbar__icons">
        <div className="nav-button">
        <Link to="/userhome">
        <FaHome className="home-button" 
        style={{
          color: "yellow",
          marginRight: "5vh" }} 
        size={40} 
       />
        </Link>
        <p>Home</p>
      </div>

      <div className="nav-button">
        <RiMessage3Fill 
        style={{ color: "yellow",
                  marginLeft: "1vh" }} 
        size={40} />


      
      <p>Messages</p>
      </div>
      </div>
      <SearchBar onSearch={handleSearch} />
    </nav>
  );
}

export default Navbar;