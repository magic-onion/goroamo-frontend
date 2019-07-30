import React from 'react'
import {Route, NavLink} from 'react-router-dom'
import CreateTour from './CreateTour'
import Home from './Home'
import Dashboard from './Dashboard'

function Sidebar() {
  return(
    <div className="sidebar">
    <ul>
      <li><NavLink exact to="/" className="nav">Current Tours</NavLink></li>

      <li><NavLink exact="true" to="/create-tour/" className="nav">Create New Tour</NavLink></li>
      <li><NavLink exact="true" to="/profile/" className="nav">Profile</NavLink></li>
      <li><NavLink exact="true" to="/analytics/" className="nav">Analytics</NavLink></li>
      <li><NavLink exact="true" to="/view-tours/" className="nav">View Tours</NavLink></li>
    </ul>
    </div>
  )
}

export default Sidebar
