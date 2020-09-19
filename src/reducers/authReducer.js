import {SET_IS_AUTH_LOADING_ACTION, SET_IS_AUTHENTICATED_ACTION} from "../constants/actions";

const initialState = {
    isAuthenticated: false,
    isAuthLoading: true
}

export default function AuthReducer(state= initialState, action) {
    switch (action.type) {
        case SET_IS_AUTHENTICATED_ACTION: {
            return {...state, isAuthenticated: action.value}
        }
        case SET_IS_AUTH_LOADING_ACTION: {
            return {...state, isAuthLoading: action.value}
        }
        default: {
            return state
        }
    }
}