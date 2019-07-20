import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function userLogin(e) {
    e.preventDefault();
    console.log(username, password)
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    .then(r=>r.json())
    .then(p => {
      localStorage.setItem('token', `${p.jwt}`)
      console.log(localStorage.token)
    })

    // Generic users index request
    // fetch('http://localhost:3000/api/v1/users', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.token}`
    //   }
    // }
    // ).then(r=>r.json()).then(console.log)

  }

  function userCreate(e) {
    e.preventDefault();
    console.log(username, password)
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          status: 'guide',
		      location: 'place',
		      avatar: 'pic'
        }
      })
    })
    .then(r=>r.json())
    .then(p => {
      console.log(p)
      localStorage.setItem('token', `${p.jwt}`)
    })
    .then(u => {
      fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })
      .then(r=>r.json())
      .then(console.log)
    })
  }

  function logOut() {
    localStorage.clear()
  }


    return (
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
      <button onClick={e => userLogin(e)}> Login </button>
      <button onClick={e=> userCreate(e)}> New User </button>
      <button onClick={e=>logOut(e)}>Log Out</button>

      </form>

  )
}
export default Login;
