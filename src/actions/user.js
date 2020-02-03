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
    fetch('http://goroamo-backend.herokuapp.com/api/v1/users', config)
    .then(r=>r.json())
    .then(p=>{
    console.log(p)
    localStorage.setItem('token', `${p.jwt}`)
    dispatch(storeUser(p))
    })
  }
}

export const userLogin = (username, password) => {
  return(dispatch) => {
    fetch('http://goroamo-backend.herokuapp.com/api/v1/login', {
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
    .then(r=>{
      if (r.status.toString()[0] !== "4") {
        return r.json()
      }
    })
    .then(p => {
      if (p !== undefined) {
        localStorage.setItem('token', `${p.jwt}`)
        console.log(p)
        dispatch(storeUser(p))
      }
      console.log(p)
    })
    .catch(err=>console.log(err))
  }
}

export const loginError = (error) =>({type: "LOGIN_ERROR" })

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
    fetch('http://goroamo-backend.herokuapp.com/api/v1/profile', config)
    .then(r=>r.json())
    .then(p => {
      dispatch(storeUser(p))
    })
  }
}


export const storeUser = (userObj) => ({type: "STORE_USER", payload: userObj})

export const sendUserLocation = () => {
  console.log("GETTING USER LOCATION")
  return (dispatch) => {
    let coords = []
    function savePos(lat, lng, array) {
      array.push(lat)
      array.push(lng)
      return array
    }
    if ("geolocation" in navigator) {

      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        console.log(lat, lng)
        savePos(lat, lng, coords)
      });
    }
    else {
      coords = [43.651070, -79.347015]
    }
    console.log(coords)
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
    fetch(`http://goroamo-backend.herokuapp.com/api/v1/tours`, config).then(r=>r.json()).then(p => {
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
    fetch(`http://goroamo-backend.herokuapp.com/api/v1/users/${param}`, config)
    .then(r=>r.json())
    .then(console.log)
  }
}
















export const createNewUser = (username, password) => {
  return(dispatch) => {
    fetch('http://goroamo-backend.herokuapp.com/api/v1/users', {
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
      fetch('http://goroamo-backend.herokuapp.com/api/v1/login', {
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

export const getToursByUser = (id) => {
  return dispatch => {
    let config = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'accept':  'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch(`http://goroamo-backend.herokuapp.com/api/v1/users/${id}/my-tours`,  config)
      .then(r=>r.json())
      .then(p => {
        dispatch(storeUserTours(p))
      })
  }
}

export const storeUserTours = (toursArray) => ({type: "STORE_USER_TOURS", payload: toursArray})
