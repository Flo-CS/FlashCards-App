import store from "../store/store";
import {addCardAction, removeCardAction, setCardsAction, updateCardAction} from "../actions/cardsActions";
import {firestoreSetCards} from "./firestore";
import {comparisonByKey} from "./universalFunctions";
import {ALL_FOLDER_ID, SPECIAL_FOLDERS_IDS} from "../constants/folders";

function setCards(cards) {
    store.dispatch(setCardsAction(cards))
    return firestoreSetCards(cards)
}

function addCard(card) {
    store.dispatch(addCardAction(card))
    return firestoreSetCards(getCards())
}

function removeCard(cardId) {
    store.dispatch(removeCardAction(cardId))
    return firestoreSetCards(getCards())
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
        return firestoreSetCards(getCards())
    }

    return false
}

function getCards() {
    return store.getState().cards
}

function getCard(cardId) {
    return store.getState().cards.find((card) => card.id === cardId)
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

function moveCards(sourceFolderId, destinationFolderId) {
    const cards = getCards()

    let areCardsDifferent = false;
    const cardsModified = cards.map((card) => {
        if (card.folderId === sourceFolderId) {
            areCardsDifferent = true
            return {...card, folderId: destinationFolderId}
        } else {
            return card
        }

    })

    if (areCardsDifferent) {
        return setCards(cardsModified)
    }
    return false

}

function removeCardsByFolderId(folderId) {
    const cards = getCards()

    const cardsFiltered = cards.filter((card) => {
        return card.folderId !== folderId
    })

    return setCards(cardsFiltered)
}

function sortCards(sortingKey, reverse) {
    const cards = getCards()

    let sortedCards = cards.sort((a, b) => {
            return comparisonByKey(a, b, sortingKey)
        }
    )

    if (reverse) {
        sortedCards.reverse()
    }

    return store.dispatch(setCardsAction(sortedCards))
}

function countCardsByFolderId(folderId) {
    const cards = getCards()

    if (folderId === ALL_FOLDER_ID) {
    // "Remove" all cards that are directly placed in SPECIAL FOLDERS
        return cards.filter((card) => {
            return !SPECIAL_FOLDERS_IDS.includes(card.folderId)
        }).length
    }

    return cards.filter((card) => {
        return card.folderId === folderId
    }).length
}

export default {
    setCards,
    addCard,
    removeCard,
    updateCard,
    getCards,
    getCard,
    getBackCard,
    getNextCard,
    moveCards,
    removeCardsByFolderId,
    sortCards,
    countCardsByFolderId
}