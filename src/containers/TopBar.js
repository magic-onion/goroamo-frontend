import React from 'react'
import { Link } from 'react-router-dom'
import LogOutButton from '../components/logout'
import MobileSidebar from './MobileSidebar'

class TopBar extends React.Component {
  constructor(props)  {
    super(props)

    this.state = {
      sidebar: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.menuOff = this.menuOff.bind(this)
  }

  toggleMenu() {
    let toggler = !this.state.sidebar
    this.setState({sidebar: toggler})
  }

  menuOff() {
    this.setState({sidebar: false})
  }

  render() {
    return(
      <>
      <div className="top-bar">
        <div onClick={this.toggleMenu} className="hamburger-menu-container">
          <img className="hamburger-menu-icon" src={require('../assets/hamburger-menu-icon.png')} alt="menu selector"/>
        </div>
          <img className="logo-img" src={require('../assets/logo-side.png')} alt="GoRoamo-logo"></img>
        <div className="top-bar-controls">
          <LogOutButton/>
        </div>
      </div>
      {this.state.sidebar ? <MobileSidebar menuOff={this.menuOff}/> : null}
      </>
    )
  }



}

export default TopBar





// <Link to="/profile/" className="top-bar-profile">My Profile</Link>
