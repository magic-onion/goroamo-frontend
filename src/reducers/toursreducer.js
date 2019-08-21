const init = {
  tours: []
}


function toursReducer(state = init, action) {
  switch (action.type) {

    case "TEST_REDUCER":
    let newState = {thing: true}
    console.log(state.thing)
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
