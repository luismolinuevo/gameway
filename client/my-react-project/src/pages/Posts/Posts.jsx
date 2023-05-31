import React, { useState, useEffect } from "react";
import "./posts.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Posts(){
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const gameName = params.get("name");
    const [imageUrl, setImageUrl] = useState("");
    const [gameTitle, setGameTitle] = useState("");

    return (
<<<<<<< Updated upstream
        <div>Start here</div>
=======
        <div>
            <Navbar />
           
            {posts}
            
        </div>
>>>>>>> Stashed changes
    );
}