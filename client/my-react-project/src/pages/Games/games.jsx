import React, { useState, useEffect } from "react";
import "./games.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Games() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const gameName = params.get("name");
  const [imageUrl, setImageUrl] = useState("");
  const [gameTitle, setGameTitle] = useState("");

  useEffect(() => {
    const requestBody = {
      client_id: "0g6f402c17u79hmds4hhynnifsr4od",
      client_secret: "pgq98nvrc9532p9klp8t481027txu6",
      grant_type: "client_credentials",
    };

    // Make the POST request to obtain the access token
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
      });
  }, [gameName]);
  
  return (
    <div className="user">
      <Navbar />
      <div className="games">
        <div className="game-container">
          <img className="game-image" src={imageUrl} alt={gameTitle} />
          <div className="game-details">
            <h1 className="game-title">{gameTitle}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;