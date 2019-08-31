export const createNewUser = (username, password) => {
  return(dispatch) => {
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
}

export const userLogin = (username, password) => {
  return(dispatch) => {
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
      dispatch(storeUser(p))
    })
  }
}




export const getProfile = () => {
  return (dispatch) => {
    let config = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch('http://localhost:3000/api/v1/profile', config)
    .then(r=>r.json())
    .then(p => {
      dispatch(storeUser(p))
    })
  }
}

export const storeUser = (userObj) => ({type: "STORE_USER", payload: userObj})













export const getAllTours = () => {
  return (dispatch) => {
    let config = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch(`http://localhost:3000/api/v1/tours`, config).then(r=>r.json()).then(p => {
      console.log(p)
      dispatch(storeTours(p))
    })
  }
}

export const storeTours = (toursArray) => ({type: "GET_TOURS", payload: toursArray})
