import React from 'react'
import { Link } from 'react-router-dom'
import LogOutButton from '../components/logout'

class TopBar extends React.Component {



  render() {
    return(
      <div className="top-bar">
          <img className="logo-img" src={require('../assets/logo-side.png')} alt="GoRoamo-logo"></img>
        <div className="top-bar-controls">
          <Link to="/profile/" className="top-bar-profile">My Profile</Link>
          <LogOutButton/>
        </div>
      </div>
    )
  }



}

export default TopBar
