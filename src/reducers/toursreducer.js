

const init = {
  tours: [],
  testMap: {},
  createdTour: {},
  mode: "",
  locations: []
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
    console.log(newCurrentTour)
    return newCurrentTour

    case "INITIAL_ADD":
    let addedLoc = state.locations
    addedLoc.push(action.payload)
    console.log(state.locations)
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
    console.log(newLocationState)
    return newLocationState

    default:
    return state
  }
}

export default toursReducer
