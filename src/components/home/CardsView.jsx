import React, {useEffect, useState} from "react";

import "./CardsView.scss"

import CardsGrid from "./CardsGrid";
import {cardsSelectors} from "../../selectors/cardsSelectors";
import {setCardsAction} from "../../actions/cardsActions";
import {connect} from "react-redux";
import {firestoreGetUserData} from "../../utils/firestore";
import {selectedFolderSelector} from "../../selectors/foldersSelectors";
import {ALL_FOLDER_ID, SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import CardsViewHeader from "./CardsViewHeader";
import Button from "../controls/buttons/Button";

function CardsView({cards, selectedFolder, setCards}) {
    const [folderFilteredCards, setFolderFilteredCards] = useState(cards)

    useEffect(() => {
        firestoreGetUserData().then((doc) => {
            const data = doc.data()
            const cards = data.cards
            setCards(cards)
        })
    }, [setCards])

    useEffect(() => {
        setFolderFilteredCards(cards.filter((card) => {
            return card.folderId === selectedFolder.id
        }))
        if (selectedFolder.id === ALL_FOLDER_ID) {
            // "Remove" all cards that are directly placed in SPECIAL FOLDERS
            setFolderFilteredCards(cards.filter((card) => {
                return !SPECIAL_FOLDERS_IDS.includes(card.folderId)
            }))
        }
    }, [cards, selectedFolder])

    return (
        <div className="cards-view">
            <CardsViewHeader/>
            <CardsGrid cards={folderFilteredCards}/>
            <Button/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        cards: cardsSelectors(state),
        selectedFolder: selectedFolderSelector(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCards: (cards) => dispatch(setCardsAction(cards)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsView)