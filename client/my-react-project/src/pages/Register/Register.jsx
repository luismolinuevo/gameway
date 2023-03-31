import React, { useState } from "react";
import logo from "../../images/logo.png"
import "./RegisterPage.scss";

function Register() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="register-page">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className={`register-container ${isAnimating ? "is-animating" : ""}`}>
        <div className="register-content">
          <h1>Register</h1>
          <form>
            <label>
              Email:
              <input type="text" name="email" />
            </label>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <button type="button" onClick={handleClick}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;