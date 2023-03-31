import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__icons">
        <img src="icon1.png" alt="Icon 1" />
        <img src="icon2.png" alt="Icon 2" />
        <img src="icon3.png" alt="Icon 3" />
      </div>
      <div className="navbar-searchbar">
        <input type="text" placeholder="Search" />
        
      </div>
      
    </nav>
  );
}

export default Navbar;