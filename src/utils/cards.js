import store from "../store/store";
import {addCardAction, removeCardAction, updateCardAction} from "../actions/cardsActions";
import {setCards} from "./firestore";


function addCard(card) {
    store.dispatch(addCardAction(card))
    return setCards(getCards())
}

function removeCard(cardId) {
    store.dispatch(removeCardAction(cardId))
    return setCards(getCards())
}

function updateCard(cardId, newCardData) {
    const card = getCard(cardId)

    //Only save if two objects values are different
    let areCardsDifferent = false;
    for (const key of Object.keys(newCardData)) {
        if (card[key] !== newCardData[key]) {
            areCardsDifferent = true;
        }
    }

    if (areCardsDifferent) {
        store.dispatch(updateCardAction(cardId, {...card, ...newCardData}))
        return setCards(getCards())
    }

    return false
}

function getCards() {
    return store.getState().cards
}

function getCard(cardId) {
    const card = store.getState().cards.filter((card) => card.id === cardId)
    // If there is a result, we take the first element of the array returned because filter give an array
    if (card.length !== 0) {
        return card[0]
    }
    return false
}

function getNextCard(currentCardId) {
    const cards = getCards()
    const cardIndex = cards.findIndex((card) => card.id === currentCardId)

    if ((cards.length - 1) === cardIndex) return cards[0]

    return cards[(cardIndex + 1)]
}

function getBackCard(currentCardId) {

    const cards = getCards()
    const cardIndex = cards.findIndex((card) => card.id === currentCardId)

    if (cardIndex === 0) return cards[(cards.length - 1)]

    return cards[(cardIndex - 1)]
}

function onCardsChange(callback) {
    store.subscribe(() => {
        callback()
    })
}

export default {addCard, removeCard, updateCard, getCards, getCard, getBackCard, getNextCard, onCardsChange}