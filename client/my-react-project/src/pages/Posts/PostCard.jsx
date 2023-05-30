import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import './postcard.scss'

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
        <div className="div postCard">
            <ul className="card--list">
                <div className="card--title">
                    <li>
                        {userName}
                    </li>
                    <li>
                        {props.title}
                    </li>
                </div>
                <li>
                    {props.game}
                </li>
                <li>
                    {props.body}
                </li>
                
            </ul>
        </div>
    )
}