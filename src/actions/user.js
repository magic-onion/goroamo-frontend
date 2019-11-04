export const newUser = (newUserObj) => {
  return (dispatch) => {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newUserObj)
    }
    fetch('http://localhost:3000/api/v1/users', config)
    .then(r=>r=>r.json())
    .then(console.log)
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
      console.log(p)
      dispatch(storeUser(p))
    })
  }
}

export const logOutUser = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(clearUserData())
  }
}

export const clearUserData = () => ({type: "LOG_OUT", payload: {}})


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

export const sendUserLocation = () => {
  return (dispatch) => {
    let coords = []
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        coords.push(position.coords.latitude);
        coords.push(position.coords.longitude);
      });
    }
    dispatch(storeLocationCoords(coords))
  }
}

export const storeLocationCoords = (array) => ({type: 'STORE_LOCATION', payload: array})


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
      dispatch(storeTours(p))
    })
  }
}

export const storeTours = (toursArray) => ({type: "GET_TOURS", payload: toursArray})



export const updateProfile = (userObj, param) => {
  return (dispatch) => {
    let config = {
      method: "PATCH",
      headers: {
        'Content-type': "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(userObj)
    }
    fetch(`http://localhost:3000/api/v1/users/${param}`, config)
    .then(r=>r.json())
    .then(console.log)
  }
}
















export const createNewUser = (username, password) => {
  return(dispatch) => {
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
      .then(p => dispatch(storeUser(p)))
    })
  }
}
