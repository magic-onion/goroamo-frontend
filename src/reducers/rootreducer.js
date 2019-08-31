import {combineReducers} from 'redux'
import tours from './toursreducer'
import user from './userreducer'

const rootReducer = combineReducers({ tours, user })

export default rootReducer
