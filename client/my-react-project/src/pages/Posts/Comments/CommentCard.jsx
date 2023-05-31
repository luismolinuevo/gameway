import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../Comments/commentpostcard.scss';

export default function CommentCard(props){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userName, setUserName] = useState("");
    const [game, setGame] = useState("");
    const {id} = useParams();

    useEffect(() =>{
        async function getUsername(){
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:8080/comment/' + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            });
            const post = await axios.get('http://localhost:8080/post/' + id);
            const username = await axios.get('http://localhost:8080/auth/user/' + post.data.userPost[0].userId)
            
            setGame(post.data.userPost[0].game);
            setBody(response.data.commentForPost[0].text);
            setUserName(username.data.username)
            console.log(response);
            // console.log(username)
            console.log(body)
        }
        getUsername();
    }, []);

    return(
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
                            {body}
                        </li>
                    </div>
                </ul>
        </div>
    )
}