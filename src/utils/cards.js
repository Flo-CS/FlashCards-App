import store from "../store/store";
import {addCardAction, removeCardAction, updateCardAction} from "../actions/cardsActions";
import {setCards} from "./firestore";


function addCard(card) {
    store.dispatch(addCardAction(card))
    return setCards(this.getCards())
}

function removeCard(cardId) {
    store.dispatch(removeCardAction(cardId))
    return setCards(this.getCards())
}

function updateCard(cardId, card) {
    store.dispatch(updateCardAction(cardId, card))
    return setCards(this.getCards())
}

function getCards() {
    return store.getState().cards
}

function getCard(cardId) {
    return store.getState().cards.filter((card) => card.id === cardId)
}

function onCardsChange(callback) {
    store.subscribe(() => {
        callback()
    })
}

export default {addCard, removeCard, updateCard, getCards, getCard, onCardsChange}