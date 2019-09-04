

const init = {
  tours: [],
  testMap: {},
  createdTour: {},
  mode: ""
}


function toursReducer(state = init, action) {
  switch (action.type) {

    case "MAKE_CREATE_TOUR_MAP":
    let newState = {...state, testMap: action.payload, mode: "create-tour"}
    console.log(newState)
    return newState

    case "GET_TOURS":
    console.log('reducer')
    let toursFetched = {...state, tours: action.payload}
    console.log(toursFetched)
    return toursFetched

    case "STORE_CREATED_TOUR":
    let newCurrentTour = {...state, createdTour: action.payload}
    return newCurrentTour

    default:
    return state
  }
}

export default toursReducer
