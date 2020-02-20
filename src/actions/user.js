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
    fetch('https://goroamo-backend.herokuapp.com/api/v1/users', config)
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
    fetch('https://goroamo-backend.herokuapp.com/api/v1/login', {
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
    fetch('https://goroamo-backend.herokuapp.com/api/v1/profile', config)
    .then(r=>r.json())
    .then(p => {
      dispatch(storeUser(p))
    })
  }
}


export const storeUser = (userObj) => ({type: "STORE_USER", payload: userObj})


// export const testLocation = () => {
//   return (dispatch) => {
//     let options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0
//     };
//
//     function success(pos) {
//       let crd = pos.coords;
//
//       console.log('Your current position is:');
//       console.log(`Latitude : ${crd.latitude}`);
//       console.log(`Longitude: ${crd.longitude}`);
//       console.log(`More or less ${crd.accuracy} meters.`);
//     }
//
//     function error(err) {
//       console.warn(`ERROR(${err.code}): ${err.message}`);
//     }
//
//     navigator.geolocation.getCurrentPosition(success, error, options);
//   }
// }



export const sendUserLocation = () => {
  console.log("GETTING USER LOCATION")
  return (dispatch) => {
    let coords = [43.6505279, -79.4488498]
    // function savePos(lat, lng, array) {
    //   array.push(lat)
    //   array.push(lng)
    //   return array
    // }
    // if ("geolocation" in navigator) {
    //   console.log("WE IN THE GEOLOC IF")
    //   console.log(navigator.geolocation)
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     let lat = position.coords.latitude
    //     let lng = position.coords.longitude
    //     console.log(position)
    //     console.log(lat, lng)
    //     savePos(lat, lng, coords)
    //   });
    // }
    // else {
    //   console.log("in the else")
    //   coords = [43.6505279, -79.4488498]
    // }
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      let crd = pos.coords;
      coords = [crd.latitude, crd.longitude]
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      coords = [43.6505279, -79.4488498]
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

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
    fetch(`https://goroamo-backend.herokuapp.com/api/v1/tours`, config).then(r=>r.json()).then(p => {
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
    fetch(`https://goroamo-backend.herokuapp.com/api/v1/users/${param}`, config)
    .then(r=>r.json())
    .then(console.log)
  }
}
















export const createNewUser = (username, password) => {
  return(dispatch) => {
    fetch('https://goroamo-backend.herokuapp.com/api/v1/users', {
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
      fetch('https://goroamo-backend.herokuapp.com/api/v1/login', {
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
    fetch(`https://goroamo-backend.herokuapp.com/api/v1/users/${id}/my-tours`,  config)
      .then(r=>r.json())
      .then(p => {
        dispatch(storeUserTours(p))
      })
  }
}

export const storeUserTours = (toursArray) => ({type: "STORE_USER_TOURS", payload: toursArray})
