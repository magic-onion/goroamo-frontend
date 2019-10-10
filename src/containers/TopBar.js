import React from 'react'
import LogOutButton from '../components/logout'

class TopBar extends React.Component {

  render() {
    return(
      <div className="top-bar">
          <img className="logo-img" src={require('../assets/logo-side.png')} alt="GoRoamo-logo"></img>
        <div className="top-bar-controls">
          <span className="top-bar-profile">My Profile</span>
          <LogOutButton/>
        </div>
      </div>
    )
  }



}

export default TopBar
