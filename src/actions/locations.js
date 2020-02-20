export const savingLocation = (locObj) => {
  return(dispatch) => {
    dispatch(savingLocationToState(locObj))
  }
}

export const savingLocationToState = (obj) => ({type: "LIVE_STORING", payload: obj})

export const saveInitialLoc = (locObj) => {
  return (dispatch) => {
    dispatch(storeInitialLocation(locObj))
  }
}

export const storeInitialLocation = (obj) => ({type: "INITIAL_ADD", payload: obj})

export const saveAllLocs = (obj) => {
  return(dispatch) => {
    for (let el of obj.locations) {
      let config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(el)
      }
      fetch('https://goroamo-backend.herokuapp.com/api/v1/locations', config)
      .then(r=>r.json())
      .then(console.log)
    }
  }
}

export const clearLocationsFromState = () => {
  return (dispatch) => {
    dispatch(clearingLocs())
  }
}

export const clearingLocs = () => ({type: "CLEAR_STORED_LOCATIONS"})



// export const saveSingleLocation = (locObj) => {
//   return (dispatch) => {
//     let config = {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem('token')}`
//       },
//       body: JSON.stringify(locObj)
//     }
//     fetch(`http://localhost:3000/api/v1/locations`, config)
//     .then(r=>r.json())
//     .then(p=> {
//       console.log(p)
//       storeLocations(p)
//     })
//   }
// }
//
// export const storeLocations = (locationsObj) => ({type: "SAVE_SINGLE_LOCATION", payload: locationsObj})
