import {combineReducers} from 'redux'
import tours from './toursreducer'
import users from './userreducer'

const rootReducer = combineReducers({ tours, users })

export default rootReducer
