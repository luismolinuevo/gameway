import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./dropdown.scss"
import { Link } from "react-router-dom";

const Dropdown = ({ query }) => {
  const [games, setGames] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(
        `https://api.twitch.tv/helix/games/top?name=${query}`,
        {
          headers: {
            'Client-ID': '0g6f402c17u79hmds4hhynnifsr4od', // Replace with your own Twitch API client ID
            Authorization: `Bearer ${accessToken}`, // Replace with your own Twitch API access token
          },
        }
      );
      const matchingGames = response.data.data.filter(game => game.name.toLowerCase().startsWith(query.toLowerCase().slice(0,3))).slice(0,5);
      if (matchingGames.length > 0) {
        setGames(matchingGames);
      } else {
        setGames([]);
      }
    };

    if (query) {
      fetchGames();
    } else {
      setGames([]);
    }
  }, [query]);

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

        // set the access token in state
        setAccessToken(accessToken);
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
    <>
      {games.length > 0 && (
        <div className="dropdown">
          {games.map((game) => (
            <Link key={game.id} to={`/games?name=${game.name}`} style={linkStyle}>
            <div className="dropdown-item" key={game.id}>
              <img src={game.box_art_url.replace("{width}", "200").replace("{height}", "200")} alt={`Box art for ${game.name}`} />
              <span className="game-name">{game.name}</span>
            </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Dropdown;