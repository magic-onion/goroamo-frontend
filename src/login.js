import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createNewUser, userLogin } from './actions/user'
import NewUser from './components/NewUser'

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault()
    props.userLogin(username, password)
  }

  function userCreate(e) {
    e.preventDefault()
    console.log(username, password)
    props.createNewUser(username, password)
  }

    return (
      <>
      <div className="login-container">

        <form className="login-form">
          <img className="login-logo" src={require('./assets/logo-side.png')} alt="GoRoamo-logo"></img>
          <input
            className="login-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
            type="text"
            name="username"
             />
          <input
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            name="password"
            />
          <button className="login-button" onClick={e => login(e)}> Login </button>
          <button className="create-user-button" onClick={e=> userCreate(e)}> Create New Account </button>

        </form>
      </div>
      <NewUser/>
      </>
  )
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewUser: (username, password) => dispatch(createNewUser(username, password)),
    userLogin: (username, password) => dispatch(userLogin(username, password))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
