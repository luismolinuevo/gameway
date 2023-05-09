import React, { useState, useEffect, useRef } from "react";
import "./SpecficChat.scss";
import axios from "axios";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkLoginStatus } from "../../redux/auth";

const socket = io(":8080", {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

export default function SpecficChat() {
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const params = useParams();
  const user = useSelector((state) => state.auth.loginId);
  const chatId = Number(params.id)

  useEffect(() => {
    dispatch(checkLoginStatus());
    
    socket.emit("connection", "Hi there");
    socket.emit("joinRoom", chatId);

    // Listen for new messages
    // socket.on("newMessage", () => {
    //   // Fetch the latest messages
    //   fetchMessages();
    // });
    socket.on("newMessageCreated", () => {
      fetchMessages();
      // setMessages(newMessages);
      console.log("hey")
      // setMessages((prevMessages) => [...prevMessages, newMessages]);
      scrollToBottom();
    });

    // Fetch initial messages
    fetchMessages();

    return () => {
      // Clean up event listeners
      socket.off("newMessage");
    };
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/chat/${params.id}`
      );
      const { success, getChat } = response.data;

      if (success) {
        console.log(getChat.messages);
        setMessages(getChat.messages);
        // setMessages((messages) => [...messages, ...getChat.messages]);
      }
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    // if (event.key === "Enter") {
      // event.preventDefault();
      try {
        const message = {
          content: inputMessage,
          userId: user, // Replace with the actual user ID
        };
        // Send the message to the server
        setMessages((prevMessages) => [...prevMessages, message]);   //this fixed it so that messages appear on page without refresh
        socket.emit("sendMessage", message, Number(params.id));

        setInputMessage(""); // Clear the input field
      } catch (error) {
        console.log("Error sending message:", error);
      }
    // }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chatroom">
      <div className="chatbox-container">
        <p>Other persons username</p>
        <div className="message-container">
          {messages.length != 0 ? (
            messages.map((items) => (
              <div className={`${items.userId === user? "rightMessage-Container" : "leftMessage-Container"}`} key={items.id} >
                <p className={`${items.userId === user? "rightMessage" : "leftMessage"}`}>{items.content}</p>
              </div>
            ))
          ) : (
            <p></p>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          {/* <form onSubmit={handleSubmit}> */}
          <input
            className="input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
