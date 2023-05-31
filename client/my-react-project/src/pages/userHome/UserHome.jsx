import React, { useState, useEffect } from "react";
import "./UserHome.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function UserHome() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // The POST request to obtain the access token
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

        // Use the access token to make a GET request to obtain the top 6 trending games
        axios
          .get("https://api.twitch.tv/helix/games/top", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Client-Id": "0g6f402c17u79hmds4hhynnifsr4od",
            },
          })
          .then((response) => {
            const filteredGames = response.data.data.filter(
              // Only focusing on these games at the moment
              (game) =>
                game.name === "Grand Theft Auto V" ||
                game.name === "Counter-Strike: Global Offensive" ||
                game.name === "Apex Legends" ||
                game.name === "Overwatch 2" ||
                game.name === "League of Legends" ||
                game.name === "Fortnite" ||
                game.name === "VALORANT"
            );

            setGames(filteredGames);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "black",
    fontSize: "2vh",
  };

  const getGameTags = (gameName) => {
    if (gameName === "Grand Theft Auto V") {
      return ["FPS", "Shooter"];
     
    }  else if (gameName === "Counter-Strike: Global Offensive"){
      return ["FPS", "Shooter"]
    }
    else if (gameName === "League of Legends"){
      return ["RPG", "Strategy", "MOBA"]
    }
    else if (gameName === "VALORANT"){
      return ["FPS", "Shooter"]
    }
    else if (gameName === "Apex Legends"){
      return ["FPS", "Shooter", "Battle Royale"]
    }
    else if (gameName === "Fortnite"){
      return ["RPG", "Shooter", "Battle Royale"]
    }
    else {
      return [];
    }
  };

  return (
    <div className="user">
      <Navbar />
      <div className="user-home">
        <span className="shiny">
          <span className="inner-shiny">Trending Games</span>
        </span>

        {isLoading ? (
          <LoadingScreen />
        ) : (
          
          <div className="games">
            {games.map((game) => (
              <Link key={game.id} to={`/games?name=${game.name}`} style={linkStyle}>
                <div className="specific-game" key={game.id}>
                  <img
                    src={`${game.box_art_url.replace("{width}", "300").replace("{height}", "400")}?${Math.random()}`}
                    alt={game.name}
                  />
                  <p className="game-name">{game.name}</p>
                  <div className="game-tags">
                    {getGameTags(game.name).map((tag) => (
                      <p key={tag}>{tag}</p>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHome;