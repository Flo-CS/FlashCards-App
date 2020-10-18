import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {sortedCardsFilteredBySelectedFolderSelector} from "../../selectors/cardsSelectors";

import CardsGrid from "./CardsGrid";

import "./CardsView.scss";
import CardsViewHeader from "./CardsViewHeader";


function CardsView({sortedCardsFilteredBySelectedFolder}) {

    return (
        <div className="CardsView">
            <CardsViewHeader/>
            <CardsGrid cards={sortedCardsFilteredBySelectedFolder}/>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        sortedCardsFilteredBySelectedFolder: sortedCardsFilteredBySelectedFolderSelector(state),
    };
}


CardsView.propTypes = {
    sortedCardsFilteredBySelectedFolder: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(React.memo(CardsView));