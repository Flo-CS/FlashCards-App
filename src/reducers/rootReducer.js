import {combineReducers} from "redux";
import authReducer from "./authReducer";
import cardsReducer from "./cardsReducer";

export default combineReducers({auth: authReducer, cards: cardsReducer})