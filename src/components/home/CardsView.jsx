import React from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types"

import "./CardsView.scss"

import CardsGrid from "./CardsGrid";
import CardsViewHeader from "./CardsViewHeader";
import {sortedCardsFilteredBySelectedFolderSelector} from "../../selectors/cardsSelectors";


function CardsView({sortedCardsFilteredBySelectedFolder}) {

    return (
        <div className="CardsView">
            <CardsViewHeader/>
            <CardsGrid cards={sortedCardsFilteredBySelectedFolder}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        sortedCardsFilteredBySelectedFolder: sortedCardsFilteredBySelectedFolderSelector(state),
    }
}


CardsView.propTypes = {
    sortedCardsFilteredBySelectedFolder: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(React.memo(CardsView))