
//Basic tour index
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

//Setup maps
export const makeMap = () => {
  return (dispatch) => {
    let testMap = new window.google.maps.Map(document.getElementById('testMap'), {
      center: {lat: 43.650, lng: -79.384},
      zoom: 14
    })
    dispatch(saveMap(testMap))
  }
}

export const saveMap = (testMap) => ({type: "SAVE_MAP", payload: testMap})
