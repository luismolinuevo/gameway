import React, { useState } from "react";
import logo from "../../images/logo.png"
import "./AccountPage.scss";
import Navbar from "../../components/Navbar/Navbar.jsx"
import {FaUserAstronaut} from 'react-icons/fa';
function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("mypassword");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="account">
      <Navbar />
      <div className="account-info-container">
        <div className="account-info-left">
          <div className="user-icon">
            <div className="user-container">
              <FaUserAstronaut 
                style={{ color: 'yellow' }}
                size={180}
              />
            </div>
          </div>
          <p className="user-name">Tom</p>
        </div>
        <div className="account-info-right">
          <div className="account-info-row">
            <p className="account-info-label">Username:</p>
            <p className="account-info-value">tomthegreat101</p>
          </div>
          <div className="account-info-row">
            <p className="account-info-label">Password:</p>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className="account-info-password"
              />
              <button
                className="password-toggle"
                onClick={handleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            
          </div>
          <div className="account-info-row">
          <p className="account-info-label">Email:</p>
          <p className="account-info-value">tomthegreat101@gmail.com</p>
          </div>
          <button>Edit Account Info</button>
        </div>
      </div>
    </div>
  );
}

export default Account;