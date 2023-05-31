import React, { useState, useEffect } from "react";
import "./posts.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

export default function Posts(){
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const gameName = params.get("name");
    const [posts, setPosts] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() =>{
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/post')
                console.log(response);
                const gameFilter = response.data.allPost.filter(x => x.game === gameName);
                setPosts(gameFilter.map(prevPosts => <PostCard key={prevPosts.id} {...prevPosts} />));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        const requestBody = {
            client_id: "0g6f402c17u79hmds4hhynnifsr4od",
            client_secret: "pgq98nvrc9532p9klp8t481027txu6",
            grant_type: "client_credentials",
          };
    
          axios
          .post("https://id.twitch.tv/oauth2/token", requestBody)
          .then((response) => {
            const accessToken = response.data.access_token;
    
            axios
              .get(`https://api.twitch.tv/helix/games?name=${gameName}`, {
                headers: {
                  "Client-ID": "0g6f402c17u79hmds4hhynnifsr4od",
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then((response) => {
                console.log("Response data:", response.data);
                const gameData = response.data.data[0];
                const gameImageUrl = gameData.box_art_url.replace("{width}x{height}", "400x600");
                const title = gameData.name;
                setImageUrl(gameImageUrl);
                setGameTitle(title);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          })
    }, [gameName]);

    return (
        <div><Navbar />
        <div className="postPage">
            

            <div className="left-container">
        
        <div className="games">
        <div className="game-container">
        <img className="game-image" src={imageUrl} alt={gameName} />
          <div className="game-details">
          
            <h1 className="game-title">{gameName}</h1>
            {/* If the title matched the following games we are working on, it will show the description. Later we will try to use api for gamedescription since twitch api does not have game descriptions*/}
            {gameName === "Grand Theft Auto V" && (
              <p>Grand Theft Auto V is a vast open world game set in Los Santos, a sprawling sun-soaked metropolis struggling to stay afloat in an era of economic uncertainty and cheap reality TV. The game blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game’s three lead characters, playing all sides of the game’s interwoven story.</p>
            )
            }
            {gameName === "League of Legends" && (
              <p>League of Legends is a fast-paced, competitive online game that blends the speed and intensity of an RTS with RPG elements. Two teams of powerful champions, each with a unique design and playstyle, battle head-to-head across multiple battlefields and game modes. With an ever-expanding roster of champions, frequent updates and a thriving tournament scene, League of Legends offers endless replayability for players of every skill level.</p>
            )
            }
            {gameName === "VALORANT" && (
              <p>Valorant is a character-based 5v5 tactical shooter set on the global stage. Outwit, outplay, and outshine your competition with tactical abilities, precise gunplay, and adaptive teamwork.</p>
            )
            }
            {gameName === "Apex Legends" && (
              <p>Conquer with character in Apex Legends, a free-to-play Hero shooter where legendary characters with powerful abilities team up to battle for fame & fortune on the fringes of the Frontier. Master an ever-growing roster of diverse Legends, deep tactical squad play and bold new innovations that go beyond the Battle Royale experience—all within a rugged world where anything goes. Welcome to the next evolution of Hero Shooter.</p>
            )}
            {gameName === "Counter-Strike: Global Offensive" && (
              <p>Counter-Strike: Global Offensive expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content</p>
            )}
            {gameName === "Overwatch 2" && (
              <p>Reunite and stand together in a new age of heroes. Overwatch 2 builds on an award-winning foundation of epic competitive play, and challenges the world’s heroes to team up, power up, and take on an overwhelming outbreak of threats around the globe.</p>
            )}
            {gameName === "Fortnite" && (
              <p>Fortnite is the completely free online game where you and your friends fight to be the last one standing in Battle Royale, join forces to make your own Creative games, or catch a live show at Party Royale.</p>
            )}
          </div>
        </div>
      </div>
            <Link to={`/createPost?name=${gameName}`}>
          <button>Create Post+</button>
            </Link>   
            </div>
            <div className="right-container">
            {posts}
            </div>
        </div></div>
    );
}