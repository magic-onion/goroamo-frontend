

const init = {
  tourLoaded: false,
  tours: [],
  testMap: {},
  createdTour: {},
  mode: "",
  locations: [],
  focusedTour: {id: null},
  currentLocation: {},
  editTour: {id: null}
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
    console.log(addedLocState)
    return addedLocState

    case "LIVE_STORING":
    let newLocs = state.locations
    let changedLocs = newLocs.map((locObj) => {
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
      let editLocs = state.editTour.locations
      let editedLocations = editLocs.map((loc) => {
        if (loc.address = action.payload.address) {
          return action.payload
        }
      })
      let newlyEditedTour = state.editTour
      newlyEditedTour.locations = editedLocations
      let editActionState = {...state, editTour: newlyEditedTour}
      return editActionState

    case "CLEAR_EDITING_ABILITY":
    let noFocusedEditTourState = {...state, editTour: {id: null, locations: []}}
    return noFocusedEditTourState

    default:
    return state
  }
}

export default toursReducer
