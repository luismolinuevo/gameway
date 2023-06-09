import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import "./UserHome.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
function UserHome() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const requestBody = {
      client_id: "0g6f402c17u79hmds4hhynnifsr4od",
      client_secret: "pgq98nvrc9532p9klp8t481027txu6",
      grant_type: "client_credentials",
    };

    axios
      .post("https://id.twitch.tv/oauth2/token", requestBody)
      .then((response) => {
        const accessToken = response.data.access_token;

        const gameNames = [
          "Grand Theft Auto V",
          "Counter-Strike: Global Offensive",
          "Apex Legends",
          "Overwatch 2",
          "League of Legends",
          "Fortnite",
          "VALORANT",
        ];

        const gamePromises = gameNames.map((name) =>
          axios.get("https://api.twitch.tv/helix/games", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Client-Id": "0g6f402c17u79hmds4hhynnifsr4od",
            },
            params: {
              name: name,
            },
          })
        );

        Promise.all(gamePromises)
          .then((responses) => {
            const filteredGames = responses
              .filter((response) => response.data.data.length > 0)
              .map((response) => response.data.data[0]);

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
    fontSize: "2vh"
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
    else if (gameName === "Overwatch 2"){
      return ["RPG", "Shooter"]
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
             <Link key={game.id} to={`/games?name=${game.name}`}style={linkStyle}>
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
