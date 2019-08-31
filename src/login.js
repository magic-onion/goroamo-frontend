import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createNewUser, userLogin } from './actions/user'

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault()
    props.userLogin(username, password)
  }

  function userCreate(e) {
    e.preventDefault()
    props.createNewUser(username, password)
  }

  function logOut() {
    localStorage.clear()
  }


    return (
      <div className="top-bar">
        <form>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
            type="text"
            name="username"
             />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            name="password"
            />
          <button onClick={e => login(e)}> Login </button>
          <button onClick={e=> userCreate(e)}> New User </button>
          <button onClick={e=>logOut(e)}>Log Out</button>

        </form>
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
    createNewUser: () => dispatch(createNewUser()),
    userLogin: (username, password) => dispatch(userLogin(username, password))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
