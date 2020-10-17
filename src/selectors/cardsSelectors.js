import {createSelector} from "reselect"
import {ALL_FOLDER_ID, SPECIAL_FOLDERS_IDS} from "../constants/folders";
import {sortCards} from "../utils/cardsFunctions";

// Base selectors
export const cardsSortingKeySelector = (state) => state.cards.cardsSortingKey
export const isCardsSortingReversedSelector = (state) => state.cards.isCardsSortingReversed
export const cardsSelectors = (state) => state.cards.cardsList
export const selectedFolderSelector = (state) => state.folders.selectedFolder


export const sortedCardsSelector = createSelector(
    [cardsSelectors, cardsSortingKeySelector, isCardsSortingReversedSelector],
    (cards, cardsSortingKey, isCardsSortingReversed) => {
        const _cards = [...cards]
        return sortCards(_cards, cardsSortingKey, isCardsSortingReversed)
    }
)

export const cardsFilteredBySelectedFolderSelector = createSelector(
    [cardsSelectors, selectedFolderSelector],
    (cards, selectedFolder) => {
        const _cards = [...cards]

        if (selectedFolder.id === ALL_FOLDER_ID) {
            // "Remove" all cards that are directly placed in SPECIAL FOLDERS
            return _cards.filter((card) => {
                return !SPECIAL_FOLDERS_IDS.includes(card.folderId)
            })
        }

        return _cards.filter((card) => {
            return card.folderId === selectedFolder.id
        })
    })

// Composed selectors
export const sortedCardsFilteredBySelectedFolderSelector = createSelector(
    [cardsFilteredBySelectedFolderSelector, cardsSortingKeySelector, isCardsSortingReversedSelector],
    (cardsFiltered, cardsSortingKey, isCardsSortingReversed) => {

        const _cardsFiltered = [...cardsFiltered]

        return sortCards(_cardsFiltered, cardsSortingKey, isCardsSortingReversed)
    })
