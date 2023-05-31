import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./postcard.scss"
import { FaUserAstronaut } from "react-icons/fa";

export default function PostCard(props){
    const [userName, setUserName] = useState("");

    useEffect(() =>{
        async function getUsername(){
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:8080/auth/login',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const user = response.data.data.username;
            setUserName(user);
        }
        getUsername();
    }, []);

    

    return(
        <div className="postCard">
            
            <div className="card">
                
                <div className="user-icon">
                <FaUserAstronaut
                style={{ color: "yellow" }} size={80} 
                />
                <p>
                {userName}
                 </p>   
                </div>

                <div>
                    <ul className="post-list">
                    
                    <li className="post-title">
                        {props.title}
                    </li>
                    <li  className="post-game">
                        {props.game}
                    </li>
                    <li  className="post-description">
                        {props.body}
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}