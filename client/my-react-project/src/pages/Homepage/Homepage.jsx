import React , {useEffect} from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";
import homepageImg from "../../images/homepageImg.jpg"
import logo from "../../images/logo.png"


const HomePage = () => {
 
    return (
        <div className="home-container">
          <div className="home-box">
            <div className="homepageImg-container">
            <img src={homepageImg} className="homepageImg"/>
            <div class="logo-container">
              <img class="logo" src={logo} alt="logo"/>
            </div>
            </div>
            <div className="home-buttons-container">
            <Link to="/login" >
              <button>Login</button>
            </Link>
            <Link to="/register" >
              <button>Register</button>
            </Link>
            </div>
          </div>
        </div>
      );
};

export default HomePage;