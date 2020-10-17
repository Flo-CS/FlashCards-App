import {comparisonByKey} from "./universalFunctions";
import {ALL_FOLDER_ID, SPECIAL_FOLDERS_IDS} from "../constants/folders";

export function sortCards(cards, sortingKey, isSortingReversed) {
    let sortedCards = cards.sort((a, b) => {
            return comparisonByKey(a, b, sortingKey)
        }
    )

    if (isSortingReversed) {
        sortedCards.reverse()
    }

    return sortedCards
}

export function getCardById(cards, cardId) {
    return cards.find((card) => card.id === cardId)
}

export function getNextCard(cards, currentCardId) {
    const cardIndex = cards.findIndex((card) => card.id === currentCardId)

    if ((cards.length - 1) === cardIndex) return cards[0]

    return cards[(cardIndex + 1)]
}

export function getBackCard(cards, currentCardId) {
    const cardIndex = cards.findIndex((card) => card.id === currentCardId)

    if (cardIndex === 0) return cards[(cards.length - 1)]

    return cards[(cardIndex - 1)]
}

export function countCards(cards, folderId) {
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
