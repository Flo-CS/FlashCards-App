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

export function setCardsAction(cards) {
    return {type: SET_CARDS_ACTION, payload: {cards}};
}

export function addCardAction(card) {
    return {type: ADD_CARD_ACTION, payload: {card}};
}

export function updateCardAction(cardId, card) {
    return {type: UPDATE_CARD_ACTION, payload: {cardId, card}};
}

export function removeCardAction(cardId) {
    return {type: REMOVE_CARD_ACTION, payload: {cardId}};
}

export function setCardsSortingKeyAction(key) {
    return {type: SET_CARDS_SORTING_KEY, payload: {key}};
}

export function setIsCardsSortingReversedAction(value) {
    return {type: SET_CARDS_SORTING_REVERSED, payload: {value}};
}

export function removeCardsByFolderIdAction(folderId) {
    return {type: REMOVE_CARDS_BY_FOLDER_ID, payload: {folderId}};
}

export function moveCardAction(cardId, destinationFolderId) {
    return {type: MOVE_CARD_ACTION, payload: {cardId, destinationFolderId}};
}

export function moveCardsAction(sourceFolderId, destinationFolderId) {
    return {type: MOVE_CARDS_ACTION, payload: {sourceFolderId, destinationFolderId}};
}
