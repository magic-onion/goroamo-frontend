import React from 'react'
import LogOutButton from '../components/logout'

class TopBar extends React.Component {

  render() {
    return(
      <div className="top-bar">
        <span className="top-bar-profile">My Profile</span>
        <LogOutButton/>
      </div>
    )
  }



}

export default TopBar
