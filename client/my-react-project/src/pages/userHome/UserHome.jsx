import React, { useState } from "react";
import logo from "../../images/logo.png"
import "./UserHome.scss";
import Navbar from "../../components/Navbar/Navbar.jsx"
function userHome() {
  

  return (
    <div className="user-home">
      <Navbar />
      {/* Rest of your UserHome content goes here */}
    </div>
  );
}

export default userHome;