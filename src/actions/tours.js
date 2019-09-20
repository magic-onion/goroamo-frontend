
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
    fetch(`http://localhost:3000/api/v1/tours`, config)
      .then(r=>r.json())
      .then(p => {
      dispatch(storeTours(p))
    })
  }
}

export const storeTours = (toursArray) => ({type: "GET_TOURS", payload: toursArray})

//Setup maps
export const makeMap = () => {
  return (dispatch) => {
    let testMap = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.650, lng: -79.384},
      zoom: 14
    })
    dispatch(saveMap(testMap))
  }
}

export const saveMap = (testMap) => ({type: "SAVE_MAP", payload: testMap})

export const addSingleLocation = (obj) => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(obj)
    })
    .then(r=>r.json())
    .then(console.log)
  }
}

export const createNewTour = (tourObj) => {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/tours', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(tourObj)
    })
    .then(r=>r.json())
    .then(p => {
      dispatch(storeCreatedTour(p))
    })
  }
}

export const storeCreatedTour = (tourObj) => ({type: "STORE_CREATED_TOUR", payload: tourObj})

export const getSingleTour = (param) => {
  return (dispatch) => {
    let config = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    let fetchString = `http://localhost:3000/api/v1/tours/${param}`
    fetch(fetchString, config)
      .then(r=>r.json())
      .then(p => dispatch(storeFocusedTour(p.tour)))
  }
}

export const storeFocusedTour = (tourObj) => ({type: 'STORE_FETCHED_TOUR', payload: tourObj})
