import {SET_IS_AUTH_LOADING_ACTION, SET_IS_AUTHENTICATED_ACTION} from "../constants/actionsTypes";

export function setIsAuthenticatedAction(value) {
    return {type: SET_IS_AUTHENTICATED_ACTION, payload: {value: value}}

}

export function setIsAuthLoadingAction(value) {
    return {type: SET_IS_AUTH_LOADING_ACTION, payload: {value: value}}

}