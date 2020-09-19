import {SET_IS_AUTH_LOADING_ACTION, SET_IS_AUTHENTICATED_ACTION} from "../constants/actions";

export function setIsAuthenticatedAction(value) {
    return {type: SET_IS_AUTHENTICATED_ACTION, value: value}

}
export function setIsAuthLoadingAction(value) {
    return {type: SET_IS_AUTH_LOADING_ACTION, value: value}

}