

const init = {
  loaded: false,
  tours: [],
  testMap: {},
  createdTour: {},
  mode: "",
  locations: [],
  focusedTour: {}
}


function toursReducer(state = init, action) {
  switch (action.type) {

    case "MAKE_CREATE_TOUR_MAP":
    let newState = {...state, testMap: action.payload, mode: "create-tour"}
    return newState

    case "GET_TOURS":
    let toursFetched = {...state, loaded: true, tours: action.payload}
    return toursFetched

    case "SAVE_MAP":
    let newMap = {...state, testMap: action.payload}
    return newMap

    case "STORE_CREATED_TOUR":
    let newCurrentTour = {...state, createdTour: action.payload}
    return newCurrentTour

    case "INITIAL_ADD":
    let addedLoc = state.locations
    addedLoc.push(action.payload)
    let addedLocState = {...state, locations: addedLoc}
    return addedLocState

    case "LIVE_STORING":
    let newLocs = state.locations
    let changedLocs = newLocs.map((locObj) => {
      if (locObj.name === action.payload.name) {
        let newLocObj = action.payload
        return newLocObj
      }
      else {
        return locObj
      }
    })
    let newLocationState = {...state, locations: changedLocs}
    return newLocationState

    case "STORE_FETCHED_TOUR":
    console.log(action.payload)
    let fetchedTourState = {...state, focusedTour: action.payload}
    return fetchedTourState

    default:
    return state
  }
}

export default toursReducer
