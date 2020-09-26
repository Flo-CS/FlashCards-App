import {combineReducers} from "redux";
import authReducer from "./authReducer";
import cardsReducer from "./cardsReducer";
import folderReducer from "./foldersReducer";

export default combineReducers({auth: authReducer, cards: cardsReducer, folders: folderReducer})