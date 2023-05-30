import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import './postcard.scss'
import { Link } from "react-router-dom";

export default function PostCard(props){
    const [userName, setUserName] = useState("");

    useEffect(() =>{
        async function getUsername(){
            const response = await axios.get('http://localhost:8080/auth/user/' + props.userId);
            const user = response.data.username;
            console.log(user);
            setUserName(user);
        }
        getUsername();
    }, []);

    

    return(
        <div className="div postCard">
            {/* Replace the link located here with the comment page of the post in question */}
            <Link className="sidebar--link" to="/games">
                <ul className="card--list">
                    <div className="card--title">
                        <li>
                            {userName}
                        </li>
                        <li>
                            {props.game}
                        </li>
                    </div>
                    <div className="card--body">
                        <li>
                            Title: {props.title}
                        </li>
                        <li>
                            {props.body}
                        </li>
                    </div>
                    
                    
                </ul>
            </Link>
        </div>
    )
}