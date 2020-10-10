import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types"

import "./CardsView.scss"

import CardsGrid from "./CardsGrid";
import CardsViewHeader from "./CardsViewHeader";
import cardsFunctions from "../../utils/cardsFunctions";
import {firestoreGetUserData} from "../../utils/firestore";
import {setCardsAction} from "../../actions/cardsActions";
import {cardsSelectors} from "../../selectors/cardsSelectors";
import {selectedFolderSelector} from "../../selectors/foldersSelectors";


function CardsView({cards, selectedFolder, setCards}) {
    const [folderFilteredCards, setFolderFilteredCards] = useState(cards)

    // Get cards from firestore and update redux store
    useEffect(() => {
        firestoreGetUserData().then((doc) => {
            const data = doc.data()
            const cards = data.cards
            setCards(cards)
        })
    }, [setCards])

    // Change displayed cards each time cards or selected folder change
    useEffect(() => {
        const selectedFolderCards = cardsFunctions.getCardsByFolderId(selectedFolder.id)
        setFolderFilteredCards(selectedFolderCards)
    }, [cards, selectedFolder])

    return (
        <div className="CardsView">
            <CardsViewHeader/>
            <CardsGrid cards={folderFilteredCards}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        cards: cardsSelectors(state),
        selectedFolder: selectedFolderSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCards: (cards) => dispatch(setCardsAction(cards)),
    }
}

CardsView.propTypes = {
    cards: PropTypes.array.isRequired,
    selectedFolder: PropTypes.object.isRequired,
    setCards: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsView)