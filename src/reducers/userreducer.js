const init = {
  user: {}
}


function userReducer(state = init, action) {
  switch (action.type) {

    case "FETCH_USER":
    let currentUserState = {user: action.payload}
    return currentUserState

    default:
    return state
  }
}

export default userReducer
