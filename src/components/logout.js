import React from 'react'
import { connect } from 'react-redux'
import { logOutUser } from '../actions/user'

function LogOutButton(props) {

  function logOut(e) {
    props.logOutUser()
  }

  return (
    <div className="log-out-button">
      <button onClick={(e)=>logOut(e)}>Log Out</button>
    </div>
  )
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
