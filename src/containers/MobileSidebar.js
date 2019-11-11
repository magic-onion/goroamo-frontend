import React from 'react'
import {NavLink} from 'react-router-dom'

function MobileSidebar(props) {
  return (
    <div className="mobile-sidebar">
      <div className="mobile-nav-container">

      <div className="mobile-item">
        <img className="mobile-nav-img" src={require(`../assets/profile-icon.png`)} alt="hi"></img>
        <NavLink onClick={props.menuOff} exact to="/profile/" className="mobile-nav">Profile</NavLink>
      </div>

      <div className="mobile-item">
        <img className="mobile-nav-img" src={require(`../assets/walking-icon.png`)} alt="hi"></img>
        <NavLink onClick={props.menuOff} exact to="/view-tours/" className="mobile-nav">View Tours</NavLink>
      </div>

      </div>
    </div>
  )
}
export default MobileSidebar
