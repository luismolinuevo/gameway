import React from "react";
import loadingImg from "../../images/logo.png";
import "./LoadingScreen.scss"
function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={loadingImg} alt="Loading..." />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingScreen;