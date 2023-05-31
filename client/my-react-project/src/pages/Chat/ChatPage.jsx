import React, { useEffect, useState } from "react";
import "./ChatPage.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { FaUserAstronaut } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkLoginStatus } from "../../redux/auth";
import axios from "axios";

function Account() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.username);

  const [chats, setChats] = useState([]);
  useEffect(() => {
    dispatch(checkLoginStatus())
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      const fetch = await axios.get(`http://localhost:8080/chat/userchats`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log(fetch.data.chatrooms);
      setChats(fetch.data.chatrooms);
    };

    fetchChats();
  }, []);

  const linkStyle = {
    textDecoration: "none"
  };

  return (
    <div className="account">
      <Navbar />
      <h1 className="chat-page-title">Chats</h1>
      <div className="chat-container">
        {chats && chats.length != 0 ? chats.map((items) => (
          <ul className="chat-list" key={items.id}>
            <Link to={"/chat/${item.id}"} style={linkStyle}>
              <li className="chat-list-item">
                <FaUserAstronaut /> {items.otherUsername}
              </li>
            </Link>
          </ul>
        )) : <p></p>}
      </div>
    </div>
  );
}

export default Account;
