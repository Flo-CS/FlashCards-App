import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types"

import "./CardsView.scss"

import CardsGrid from "./CardsGrid";
import CardsViewHeader from "./CardsViewHeader";
import cardsFunctions from "../../utils/cardsFunctions";
import {cardsSelectors} from "../../selectors/cardsSelectors";
import {selectedFolderSelector} from "../../selectors/foldersSelectors";


function CardsView({cards, selectedFolder}) {
    const [folderFilteredCards, setFolderFilteredCards] = useState(cards)


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


CardsView.propTypes = {
    cards: PropTypes.array.isRequired,
    selectedFolder: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CardsView)