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
        <img src={logo} alt="Logo" />
      </div>
      <div className={`login-container ${isAnimating ? "is-animating" : ""}`}>
        <div className="login-content">
          <h1>Login</h1>
          <form>
            
            <label>
              Username
              <input 
              type="text" 
              name="username" 
              value={username}
              onChange={(event) => setUsername(event.target.value)}/>
            </label>
            <label>
              Password
              <input 
              type="password" 
              name="password" 
              value={password}
              onChange={(event) => setPassword(event.target.value)}/>
            </label>
            <button type="button" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
{/* <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            /> */}