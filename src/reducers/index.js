import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import CardsReducer from "./CardsReducer";

export default combineReducers({auth: AuthReducer, cards: CardsReducer})