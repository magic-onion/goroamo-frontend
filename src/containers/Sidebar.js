import React from 'react'
import {Route, Link} from 'react-router-dom'
import CreateTour from './CreateTour'
import Home from './Home'
import Dashboard from './Dashboard'

function Sidebar() {
  return(
    <div className="sidebar">
    <ul>
      <li><Link to="/" className="nav">Current Tours</Link></li>

      <li><Link to="/create-tour/" className="nav">Create New Tour</Link></li>
      <li><Link to="/profile/" className="nav">Profile</Link></li>
      <li><Link to="/analytics/" className="nav">Analytics</Link></li>
      <li><Link to="/view-tours/" className="nav">View Tours</Link></li>
    </ul>
    </div>
  )
}

export default Sidebar
