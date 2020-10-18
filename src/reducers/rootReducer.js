import {combineReducers} from "redux";
import {USER_LOGOUT_ACTION} from "../constants/actionsTypes";
import authReducer from "./authReducer";
import cardsReducer from "./cardsReducer";
import folderReducer from "./foldersReducer";

const appReducer = combineReducers({auth: authReducer, cards: cardsReducer, folders: folderReducer});

export default function rootReducer(state, action) {
    if (action.type === USER_LOGOUT_ACTION) {
        state = undefined;
    }
    return appReducer(state, action);
}