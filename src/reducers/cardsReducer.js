import {
    ADD_CARD_ACTION,
    MOVE_CARD_ACTION,
    MOVE_CARDS_ACTION,
    REMOVE_CARD_ACTION,
    REMOVE_CARDS_BY_FOLDER_ID,
    SET_CARDS_ACTION,
    SET_CARDS_SORTING_KEY,
    SET_CARDS_SORTING_REVERSED,
    UPDATE_CARD_ACTION
} from "../constants/actionsTypes";
import {DEFAULT_CARDS_SORT_OPTION} from "../constants/cards";

const initialState = {
    cardsList: [], cardsSortingKey: DEFAULT_CARDS_SORT_OPTION.value,
    isCardsSortingReversed: false
};


export default function cardsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CARDS_ACTION: {
            return {...state, cardsList: [...action.payload.cards]};
        }
        case ADD_CARD_ACTION: {
            return {...state, cardsList: [...state.cardsList, action.payload.card]};
        }
        case UPDATE_CARD_ACTION: {
            return {
                ...state, cardsList: state.cardsList.map(card => {
                    return card.id === action.payload.cardId ? action.payload.card : card;
                })
            };
        }
        case REMOVE_CARD_ACTION: {
            return {
                ...state, cardsList: state.cardsList.filter(card => {
                    return card.id !== action.payload.cardId;
                })
            };
        }
        case SET_CARDS_SORTING_KEY: {
            return {...state, cardsSortingKey: action.payload.key};
        }
        case SET_CARDS_SORTING_REVERSED: {
            return {...state, isCardsSortingReversed: action.payload.value};
        }
        case REMOVE_CARDS_BY_FOLDER_ID: {
            return {
                ...state, cardsList: state.cardsList.filter(card => {
                    return card.folderId !== action.payload.folderId;
                })
            };
        }
        case MOVE_CARD_ACTION: {
            const _cards = [...state.cardsList];
            return {
                ...state, cardsList: _cards.map((card) => {
                    return card.id === action.payload.cardId ? {
                        ...card,
                        folderId: action.payload.destinationFolderId
                    } : card;
                })
            };
        }
        case MOVE_CARDS_ACTION: {
            const _cards = [...state.cardsList];

            return {
                ...state, cardsList: _cards.map((card) => {
                    if (card.folderId === action.payload.sourceFolderId) {
                        return {...card, folderId: action.payload.destinationFolderId};
                    } else {
                        return card;
                    }

                })
            };
        }
        default: {
            return state;
        }
    }
}