import React, { useState, useEffect } from "react";
import { FaUserAstronaut, FaHome } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import SearchBar from './SearchBar/SearchBar';
import "./navbar.scss";
import SideBar from "./SideBar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { checkLoginStatus } from "../../redux/auth";
function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [gameList, setGameList] = useState([]);
  const dispatch = useDispatch();
  const handleSearch = (query) => {
    console.log(`Searching for ${query}...`);
    // perform search logic here
  };


  const username = useSelector((state) => state.auth.username);
  
  useEffect(() => {
    dispatch(checkLoginStatus())

  }, [])
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
      <p className="nav-username">{username}</p>
      <SearchBar onSearch={handleSearch} />
    </nav>
  );
}

export default Navbar;