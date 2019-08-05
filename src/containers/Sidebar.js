import React from 'react'
import {NavLink} from 'react-router-dom'

function Sidebar() {
  return(
    <div className="sidebar">
    <div className="nav-container">
      <NavLink exact to="/" className="nav">Current Tours</NavLink>

      <NavLink exact to="/create-tour/" className="nav">Create New Tour</NavLink>
      <NavLink exact to="/profile/" className="nav">Profile</NavLink>
      <NavLink exact to="/analytics/" className="nav">Analytics</NavLink>
      <NavLink exact to="/view-tours/" className="nav">View Tours</NavLink>
    </div>
    </div>
  )
}

export default Sidebar
