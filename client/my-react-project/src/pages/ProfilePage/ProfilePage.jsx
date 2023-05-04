import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { FaUserAstronaut } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <div>
      <div className="account">
        <Navbar />
        <div className="account-info-container">
          <div className="account-info-left">
            <div className="user-icon">
              <div className="user-container">
                <FaUserAstronaut style={{ color: "yellow" }} size={180} />
              </div>
            </div>
            <p className="user-name">Tom</p>
          </div>
        </div>
      </div>
    </div>
  );
}
