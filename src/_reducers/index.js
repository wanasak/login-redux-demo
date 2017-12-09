import { combineReducers } from 'redux'

import { auth } from './auth.reducer'
import { users } from './user.reducer'
import { alert } from './alert.reducer'
import { registration } from './registration.reducer'

const rootReducer = combineReducers({
    auth,
    users,
    alert,
    registration
})

export default rootReducer