import React from 'react'
import { connect } from 'react-redux'
import { logOutUser } from '../actions/user'

function LogOutButton(props) {

  function logOut(e) {
    props.logOutUser()
  }

  return  <button className="log-out-button" onClick={(e)=>logOut(e)}>Log Out</button>
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LogOutButton)
