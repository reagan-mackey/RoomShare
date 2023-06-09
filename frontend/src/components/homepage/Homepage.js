import React from 'react'
import "./homepage.css"
import visualSVG from "./homePage.svg"

const Homepage = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="Homepage">
      <div className="navbar">
        <div className="navbar-logo">
          <h2>r/s</h2>
        </div>
      </div>
      <div className="main-body">
        <div className="main-message">
          <h1 className="main-msg-regular">find your</h1>
          <h1 className="main-msg-gradient">new</h1>
          <h1 className="main-msg-regular">roommate</h1>
        </div>
        <div className="statement">
          <p>made for and by students interning</p>
          <p>in new cities.</p>
        </div>
        <div className="sign-up-button-div">
          <button className="sign-up-button" onClick={handleLogin}>get started</button>
        </div>
      </div>
      <div className="visual-div">
        <img src={visualSVG} alt="" />
      </div>
    </div>
  );
}

export default Homepage;