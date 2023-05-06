import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import "./UserHome.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

function UserHome() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    //the POST request to obtain the access token
    const requestBody = {
      client_id: "0g6f402c17u79hmds4hhynnifsr4od",
      client_secret: "pgq98nvrc9532p9klp8t481027txu6",
      grant_type: "client_credentials",
    };

    // Make the POST request to obtain the access token
    axios.post("https://id.twitch.tv/oauth2/token", requestBody)
      .then((response) => {
        const accessToken = response.data.access_token;

        // Use the access token to make a GET request to obtain the top 6 trending games
        axios.get("https://api.twitch.tv/helix/games/top", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": "0g6f402c17u79hmds4hhynnifsr4od",
          },
        })
        .then((response) => {
          const filteredGames = response.data.data.filter(
            //only focusing on these games at the moment
            (game) => 
            game.name === 'Grand Theft Auto V' || 
            game.name === 'Counter-Strike: Global Offensive' || 
            game.name === "Apex Legends" || 
            game.name === "Overwatch 2" || 
            game.name === "League of Legends" || 
            game.name === "Fortnite" ||  
            game.name === "VALORANT");
            setGames(filteredGames);
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "black",
    fontSize: "2vh"
  };
  return (
    <div className="user">
      <Navbar />
      <div className="user-home">
        <span className="shiny">
        <span className="inner-shiny">Trending Games</span>
        </span>
        <div className="games">
          {games.map((game) => (
             <Link key={game.id} to={`/games?name=${game.name}`}style={linkStyle}>
            <div key={game.id}>
            <img  src={game.box_art_url.replace("{width}", "300").replace("{height}", "400")} alt={game.name}></img>
            <p className="game-name">{game.name}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
