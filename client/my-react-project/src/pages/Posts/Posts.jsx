import React, { useState, useEffect } from "react";
import "./posts.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";

export default function Posts(){
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const gameName = params.get("name");
    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/post')
                console.log(response);
                let gameFilter = response.data.allPost.filter(x => x.game === gameName);
                gameFilter = gameFilter.reverse();
                setPosts(gameFilter.map(prevPosts => <PostCard key={prevPosts.id} {...prevPosts} />));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [gameName]);

    return (
        <div>
            <Navbar />
            <div className="post--list">

                {posts}
            </div>
            
        </div>
    );
}