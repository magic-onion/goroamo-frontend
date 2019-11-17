import React from 'react'
import {NavLink} from 'react-router-dom'
function TouristSidebar() {
  return(
    <div className="sidebar">
    <div className="nav-container">

      <div className="nav-item">
        <img className="nav-img" src={require(`../assets/profile-icon.png`)} alt="hi"></img>
        <NavLink exact to="/profile/" className="nav">Profile</NavLink>
      </div>

      <div className="nav-item">
        <img className="nav-img" src={require(`../assets/walking-icon.png`)} alt="hi"></img>
        <NavLink exact to="/view-tours/" className="nav">View Tours</NavLink>
      </div>

      <div className="nav-item">
        <img className="nav-img" src={require(`../assets/analytics-icon.png`)} alt="about"></img>
        <NavLink exact to="/about/" className="nav">About</NavLink>
      </div>

    </div>
    </div>
  )
}

export default TouristSidebar
