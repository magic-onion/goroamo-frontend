

const init = {
  tours: [],
  testMap: {}
}


function toursReducer(state = init, action) {
  switch (action.type) {

    case "SAVE_MAP":
    let newState = {...state, testMap: action.payload}
    console.log(newState)
    return newState

    case "GET_TOURS":
    console.log('reducer')
    let toursFetched = {...state, tours: action.payload}
    console.log(toursFetched)
    return toursFetched

    default:
    return state
  }
}

export default toursReducer
