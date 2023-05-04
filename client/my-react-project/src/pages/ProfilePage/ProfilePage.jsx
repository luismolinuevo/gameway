import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { FaUserAstronaut } from "react-icons/fa";
import "./ProfilePage.scss";

export default function ProfilePage() {
  return (
    <div>
      <div className="profile">
        <Navbar />
        <div className="profile-info-container">
          <div className="profile-info-left">
            <div className="profile-user-icon">
              <div className="profile-user-container">
                <FaUserAstronaut style={{ color: "yellow" }} size={180} />
              </div>
            </div>
            <div className="profile-actions">
              <p className="profile-user-name">Tom</p>
              <div>
                <button className="profile-buttons">
                    Follow
                </button>
                <button className="profile-buttons">
                    Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
