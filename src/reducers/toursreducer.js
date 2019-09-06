

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
    let toursFetched = {...state, tours: action.payload}
    return toursFetched

    case "SAVE_MAP":
    console.log(action.payload.getDiv())

    let newMap = {...state, testMap: action.payload}
    return newMap

    case "STORE_CREATED_TOUR":
    let newCurrentTour = {...state, createdTour: action.payload}
    return newCurrentTour

    default:
    return state
  }
}

export default toursReducer
