import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'))

const initialState = user ? { user, loggedIn: true } : {};

export function auth(state = initialState, action) {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            }
        case userConstants.LOGIN_FAILURE:
        case userConstants.LOGOUT:
            return {}
        default:
            return state
    }
}