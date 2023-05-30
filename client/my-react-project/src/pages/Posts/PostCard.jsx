import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import './postcard.scss'
import { Link } from "react-router-dom";

export default function PostCard(props){
    const [userName, setUserName] = useState("");

    useEffect(() =>{
        async function getUsername(){
            console.log(props);
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:8080/auth/user/' + props.userId);
            console.log(response);
            const user = response.data.username;
            setUserName(user);
        }
        getUsername();
    }, []);

    

    return(
        <div className="div postCard">
            <Link className="link"to="/comments">
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