const init = {
  user: {},
  loggedIn: false
}


function userReducer(state = init, action) {
  switch (action.type) {

    case "STORE_USER":
    let currentUserState = {user: action.payload, loggedIn: true}
    return currentUserState

    case "LOG_OUT":
    return init

    default:
    return state
  }
}

export default userReducer
