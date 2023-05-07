import React from 'react'
import "./displayprofile.css"

const DisplayProfile = () => {
  return (
    <div className="display-profile-page">
        <div className="navbar">
            <div className= "navbar-logo">
                <h2>r/s</h2>
            </div>
        </div>
        <div className="profile-card-panel">
            <div className="user-name">
                <h2>Janani</h2>
                <h2>Pandurangan</h2>
            </div>
            <div className="user-info">
                <p><em>Gender: </em>insert here</p>
                <p><em>University/College: </em>insert here</p>
                <p><em>Major: </em>insert here</p>
                <p><em>Intern Location: </em>insert here</p>
                <p><em>Start Date: </em>insert here</p>
                <p><em>End Date: </em>insert here</p>
                <p><em>Hobbies: </em>insert here</p>
            </div>
        </div>

        <div className="back-btn-div">
            <button action=""className="back-btn">back</button>
        </div>
    </div>
  );
}

export default DisplayProfile