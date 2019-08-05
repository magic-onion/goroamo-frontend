import React from 'react'
import {NavLink} from 'react-router-dom'

function Sidebar() {
  return(
    <div className="sidebar">
    <ul>
      <li><NavLink exact to="/" className="nav">Current Tours</NavLink></li>

      <li><NavLink exact to="/create-tour/" className="nav">Create New Tour</NavLink></li>
      <li><NavLink exact to="/profile/" className="nav">Profile</NavLink></li>
      <li><NavLink exact to="/analytics/" className="nav">Analytics</NavLink></li>
      <li><NavLink exact to="/view-tours/" className="nav">View Tours</NavLink></li>
    </ul>
    </div>
  )
}

export default Sidebar
