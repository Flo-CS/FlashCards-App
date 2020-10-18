import PropTypes from "prop-types";
import React from "react";

import "./CardModalCardInner.scss";

function CardModalCardInner({currentCard, onCardContentInputChange, onCardClick, isBackShown, isInEditMode}) {

    function handleCardClick(e) {
        onCardClick(e);
    }

    function handleCardContentInputChange(e) {
        e.persist();
        onCardContentInputChange(e.target.value);
    }

    return <div className="CardModal__CardInner"
                onClick={handleCardClick}>
        {isBackShown ?
            (
                isInEditMode ? (
                    <textarea className="CardModal__CardTextarea"
                              value={currentCard.backContent}
                              onChange={handleCardContentInputChange}
                              autoFocus={true}
                    />
                ) : (
                    <p className="CardModal__CardBackContent">{currentCard.backContent}</p>
                )

            ) : (
                isInEditMode ? (
                    <textarea className="CardModal__CardTextarea"
                              value={currentCard.frontContent}
                              onChange={handleCardContentInputChange}
                              autoFocus={true}
                    />
                ) : (
                    <p className="CardModal__CardFrontContent">{currentCard.frontContent}</p>
                )
            )
        }
    </div>;

}

CardModalCardInner.propTypes = {
    currentCard: PropTypes.object.isRequired,
    onCardContentInputChange: PropTypes.func.isRequired,
    onCardClick: PropTypes.func.isRequired,
    isBackShown: PropTypes.bool.isRequired,
    isInEditMode: PropTypes.bool.isRequired,
};

export default React.memo(CardModalCardInner);