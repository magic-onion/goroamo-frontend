

const init = {
  tourLoaded: false,
  userTours: [],
  userToursLoaded: false,
  testMap: {},
  createdTour: {},
  mode: "",
  locations: [],
  focusedTour: {id: null},
  currentLocation: {},
  editTour: {id: null},
  touristTours: [],
  touristLoaded: false
}


function toursReducer(state = init, action) {
  switch (action.type) {

    case "MAKE_CREATE_TOUR_MAP":
    let newState = {...state, testMap: action.payload, mode: "create-tour"}
    return newState

    case "GET_TOURS":
    let toursFetched = {...state, touristLoaded: true, touristTours: action.payload}
    return toursFetched

    case "STORE_USER_TOURS":
    let storeUserToursState = {...state, userToursLoaded: true, userTours: action.payload}

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
    console.log(addedLocState)
    return addedLocState

    case "LIVE_STORING":
    let newLocs = state.locations
    let changedLocs = newLocs.map((locObj) => {
      console.log(locObj.location.address, action.payload.location.address, 'hello')
      if (locObj.location.address === action.payload.location.address) {
        let newLocObj = action.payload
        return newLocObj
      }
      else {
        return locObj
      }
    })
    let newLocationState = {...state, locations: changedLocs}
    return newLocationState

    case "TOUR_NOW_LOADED":
    console.log("tourLoader")
    let tourIsLoadedState = {...state, tourLoaded: true}
    return tourIsLoadedState

    case "STORE_FETCHED_TOUR":
    let fetchedTourState = {...state, focusedTour: action.payload}
    return fetchedTourState

    case "STORE_TOUR_TO_EDIT":
    let fetchForEdit = {...state, editTour: action.payload}
    return fetchForEdit

    case "LIVE_STORING_EDITS":
      let editedLocations = state.editTour.locations.map((loc) => {
        console.log(action.payload, loc, action.payload.address )
        if (loc.address === action.payload.address) {
          return action.payload
        }
        else {
          return loc
        }
      })
      let newlyEditedTour = {...state.editTour}
      newlyEditedTour.locations = editedLocations
      let editActionState = {...state, editTour: newlyEditedTour}
      return editActionState

    case "CLEAR_EDITING_ABILITY":
    let noFocusedEditTourState = {...state, editTour: {id: null, locations: []}}
    return noFocusedEditTourState

    case "REMOVE_SINGLE_LOCATION":
    let removedLocs = state.locations
    removedLocs.splice(action.payload, 1)
    let removedLocationState = {...state, locations: removedLocs}
    return removedLocationState

    case "CLEAR_STORED_LOCATIONS":
      let clearedLocs = []
      let clearedLocState = {...state, locations: clearedLocs}
      return clearedLocState


    case "LOG_OUT":
    return init

    default:
    return state
  }
}

export default toursReducer
