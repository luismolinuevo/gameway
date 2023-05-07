import React, { useState } from "react";
import "./AccountPage.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { FaUserAstronaut } from 'react-icons/fa';

function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("mypassword");
  const [displayAccountInfo, setDisplayAccountInfo] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setDisplayAccountInfo(false);
  };

  const handleShowAccountInfo = () => {
    setDisplayAccountInfo(true);
    setShowPassword(false);
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
          <div className="account-buttons-container">
            <button
              className={`account-button ${displayAccountInfo ? 'active' : ''}`}
              onClick={handleShowAccountInfo}
            >
              Account
            </button>
            <button
              className={`account-button ${!displayAccountInfo ? 'active' : ''}`}
              onClick={handleShowPassword}
            >
              Password
            </button>
          </div>
        </div>
        <div className="divider"></div>
        <div className="account-info-right">
          {displayAccountInfo ? (
            <>
              <div className="account-info-row">
                <p className="account-info-label">Username:</p>
                <p className="account-info-value">tomthegreat101</p>
              </div>
              <div className="account-info-row">
                <p className="account-info-label">Email:</p>
                <p className="account-info-value">tomthegreat101@gmail.com</p>
              </div>
            </>
          ) : (
            <div className="account-info-row">
              <p className="account-info-label-password">Password:</p>
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
          )}
          <button className="account-button-edit">Edit Account Info</button>
        </div>
      </div>
    </div>
  );
}

export default Account;