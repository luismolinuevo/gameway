import React, { useState } from "react";
import "./ChatPage.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { FaUserAstronaut } from 'react-icons/fa';
import { useParams, Link } from "react-router-dom";
function Account() {
    const [mockChatters, setMockChatters] = useState([
        { id: 1, username: "Mock User ", img: <FaUserAstronaut/>},
        { id: 2, username: "Mock User 2", img: <FaUserAstronaut/> },
        { id: 3, username: "Mock User 3", img: <FaUserAstronaut/> },
        { id: 4, username: "Mock User 4", img: <FaUserAstronaut/> },
      ]);
      const linkStyle = {
        textDecoration: "none"
      };

  return (
    <div className="account">
      <Navbar />
      <h1 className="chat-page-title">Chats</h1>
      <div className="chat-container">
        
        {mockChatters.map((chatters) =>(
        
        <ul className="chat-list">
        <Link to="/chat/:id" style={linkStyle}>
            <li className="chat-list-item">
              {chatters.img} {chatters.username}
              </li>
        </Link>
        </ul>
        ))}
      </div>
     
    </div>
  );
}

export default Account;