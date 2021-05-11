import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {cardsFilteredBySelectedFolderSelector} from "../selectors/cardsSelectors";

import "./Learn.scss";


function Learn({cardsFilteredBySelectedFolder}) {


    return (
        <div className="Learn">
            <div className="Learn__Wrapper">
                <main className="Learn__Main">
                    {JSON.stringify(cardsFilteredBySelectedFolder)}
                </main>
            </div>

        </div>
    );

}

function mapStateToProps(state) {
    return {
        cardsFilteredBySelectedFolder: cardsFilteredBySelectedFolderSelector(state)
    };
}

Learn.propTypes = {
    cardsFilteredBySelectedFolder: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Learn);

