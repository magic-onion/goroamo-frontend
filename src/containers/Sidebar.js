import React from 'react'
import {NavLink} from 'react-router-dom'
function Sidebar() {
  return(
    <div className="sidebar">
    <div className="nav-container">

      <div className="nav-item">
        <img className="nav-img" src={require(`../assets/tour-icon.png`)} alt="hi"></img>
        <NavLink exact to="/" className="nav">Current Tours</NavLink>
      </div>

      <div className="nav-item">
        <img className="nav-img" src={require(`../assets/plus-icon.png`)} alt="hi"></img>
      <NavLink exact to="/create-tour/" className="nav">Create New Tour</NavLink>
      </div>

      <div className="nav-item">
        <img className="nav-img" src={require(`../assets/profile-icon.png`)} alt="hi"></img>
        <NavLink exact to="/profile/" className="nav">Profile</NavLink>
      </div>

      <div className="nav-item">
        <img className="nav-img" src={require(`../assets/analytics-icon.png`)} alt="hi"></img>
        <NavLink exact to="/analytics/" className="nav">Analytics</NavLink>
      </div>

      <div className="nav-item">
        <NavLink exact to="/view-tours/" className="nav">View Tours</NavLink>
      </div>
    </div>
    </div>
  )
}

export default Sidebar
