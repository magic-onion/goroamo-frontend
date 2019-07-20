import React from 'react'
import {Route, Link} from 'react-router-dom'
import CreateTour from './CreateTour'
import Home from './Home'
import Dashboard from './Dashboard'

function Sidebar() {
  return(
    <div className="sidebar">
      <Link to="/">Current Tours</Link>
      <Link to="/create-tour/">Create New Tour</Link>
      <Link to="/profile/">Profile</Link>
      <Link to="/analytics/">Analytics</Link>
      <Route path="/" exact component={Home} />
        <Route path="/create-tour/" component={CreateTour} />
        <Route path="/profile/" component={Dashboard} />
        <Route path="/analytics/" component={Home} />
    </div>
  )
}

export default Sidebar
