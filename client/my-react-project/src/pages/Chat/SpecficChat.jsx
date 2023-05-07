import React, {useState, useEffect} from 'react'; 
import "./SpecficChat.scss";
import axios from "axios";
import { io } from "socket.io-client";

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
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setMessage("")
        }

    }

  return (
    <div className='chatroom'>
        <div className='chatbox-container'>
            <p>Other persons username</p>
            <div className='message-container'>
                <p>message</p>
            </div>
            <div>
                {/* <form onSubmit={handleSubmit}> */}
                    <input type="text" className='input' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleSubmit}/>
                    {/* <button type="submit">Send</button> */}
                {/* </form> */}
            </div>
        </div>
    </div>
  )
}
