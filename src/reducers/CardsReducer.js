import {ADD_CARD_ACTION, REMOVE_CARD_ACTION, SET_CARDS_ACTION, UPDATE_CARD_ACTION} from "../constants/actionsTypes";

const initialState = []

export default function CardsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CARDS_ACTION: {
            return [...action.payload.cards]
        }
        case ADD_CARD_ACTION: {
            return [...state, action.payload.card]
        }
        case UPDATE_CARD_ACTION: {
            return state.map(card => {
                return card.id === action.payload.cardId ? action.payload.card : card
            })
        }
        case REMOVE_CARD_ACTION: {
            return state.filter(card => {
                return card.id !== action.payload.cardId
            })
        }
        default: {
            return state
        }
    }
}