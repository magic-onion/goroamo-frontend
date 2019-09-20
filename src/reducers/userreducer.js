const init = {
  user: {},
  loggedIn: false,
  coords: []
}


function userReducer(state = init, action) {
  switch (action.type) {

    case "STORE_USER":
    let currentUserState = {user: action.payload, loggedIn: true}
    return currentUserState

    case "STORE_LOCATION":
    let coordinateState = {...state, coords: action.payload}
    return coordinateState

    case "LOG_OUT":
    return init

    default:
    return state
  }
}

export default userReducer
