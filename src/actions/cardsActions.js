import {ADD_CARD_ACTION, REMOVE_CARD_ACTION, SET_CARDS_ACTION, UPDATE_CARD_ACTION} from "../constants/actionsTypes";

export function setCardsAction(cards) {
    return {type: SET_CARDS_ACTION, payload: {cards}}
}

export function addCardAction(card) {
    return {type: ADD_CARD_ACTION, payload: {card}}
}

export function updateCardAction(cardId, card) {
    return {type: UPDATE_CARD_ACTION, payload: {cardId, card}}
}

export function removeCardAction(cardId) {
    return {type: REMOVE_CARD_ACTION, payload: {cardId}}
}