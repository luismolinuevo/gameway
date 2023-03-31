import React, { useState } from "react";
import "./LoginPage.scss";
import logo from "../../images/logo.png"
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isAnimating, setIsAnimating] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    console.log("Submitted!", username, password);
    // Replace this with your actual login logic
  }

  return (
    <div className="login-page">
        <div className="logo-container">
    <img src={logo} alt="Logo" className="logo"/>
    </div>
      <form onSubmit={handleSubmit}>
      <div className={`login-container ${isAnimating ? "is-animating" : ""}`}>
        <label className="title">Sign In</label>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="forgot">Forgot Password?</button>
          </label>
          
          <br />
          <button type="submit" className="animated-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;