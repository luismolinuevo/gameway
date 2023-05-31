import React from "react";
import '../Comments/commentcard.scss';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CommentCard(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userName, setUserName] = useState("");
    const [game, setGame] = useState("");
    const {id} = useParams();

    useEffect(() =>{
        async function getUsername(){
            console.log(id);
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:8080/post/' + id);
            const username = await axios.get('http://localhost:8080/auth/user/' + response.data.userPost[0].userId)
            setGame(response.data.userPost[0].game);
            setBody(response.data.userPost[0].body);
            setTitle(response.data.userPost[0].title);
            setUserName(response.data.username)
            console.log(response);
            console.log(username)
            console.log(response.data.userPost[0].userId)
        }
        getUsername();
    }, []);

    return (
        <div className="postComment--main">
                <ul className="postComment--list">
                    <div className="postComment--title">
                        <li>
                            {userName}
                        </li>
                        <li>
                            {game}
                        </li>
                    </div>
                    <div className="postComment--body">
                        <li>
                            Title: {title}
                        </li>
                        <li>
                            {body}
                        </li>
                    </div>
                </ul>
        </div>
    )
}