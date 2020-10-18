import PropTypes from "prop-types";
import React, {useCallback, useEffect, useState} from "react";

import {IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdClose, IoMdCreate, IoMdFlash, IoMdHelp} from "react-icons/io";
import {connect} from "react-redux";
import {updateCardAction} from "../../../actions/cardsActions";
import {cardsFilteredBySelectedFolderSelector} from "../../../selectors/cardsSelectors";
import {getBackCard, getCardById, getNextCard} from "../../../utils/cardsFunctions";
import CardFlipAnimation from "../../home/CardFlipAnimation";
import Modal from "../Modal";

import "./CardModal.scss";
import CardModalCardInner from "./CardModalCardInner";


function CardModal({initialCardId, onModalClose, isCardBackShown, cards, updateCard}) {
    const [isBackShown, setIsBackShown] = useState(isCardBackShown);
    const [isInEditMode, setIsInEditMode] = useState(true);
    const [currentCard, setCurrentCard] = useState({});

    useEffect(() => {
        const card = getCardById(cards, initialCardId);
        setCurrentCard(card);
    }, [cards, initialCardId]);


    function handleSaveCard() {
        updateCard(currentCard.id, {...currentCard});
    }

    // Card controls
    function handleCardContentInputChange(newValue) {
        if (isBackShown) {
            setCurrentCard((card) => {
                return {...card, backContent: newValue};
            });
        } else {
            setCurrentCard((card) => {
                return {...card, frontContent: newValue};
            });
        }
    }

    function handleCardEditButtonClick() {
        setIsInEditMode((isInEditMode) => !isInEditMode);
        if (isInEditMode) {
            handleSaveCard();
        }
    }

    // Card behavior
    function handleCardClick(e) {
        if (isInEditMode) {
            // Exit edit mode only if don't click on the textarea
            if (e.target.nodeName.toLowerCase() !== "textarea") {
                setIsInEditMode(false);
                handleSaveCard();
            }
        }
    }

    const handleCardReverse = useCallback(() => {
        setIsBackShown((isBackShown) => !isBackShown);
    }, []);


    // Modal controls
    const handleNextCardButtonClick = useCallback(() => {
        const nextCard = getNextCard(cards, currentCard.id);
        setCurrentCard(nextCard);
    }, [cards, currentCard.id]);

    const handleBackCardButtonClick = useCallback(() => {
        const backCard = getBackCard(cards, currentCard.id);
        setCurrentCard(backCard);
    }, [cards, currentCard.id]);

    // Modal behavior
    const handleModalClose = useCallback(() => {
        onModalClose();
    }, [onModalClose]);


    return (<Modal onModalClose={handleModalClose}>
            <div className="CardModal">
                <CardFlipAnimation isBackShown={isBackShown}>
                    <div className="CardModal__Card">
                        <div className="CardModal__CardControls">
                            <button onClick={handleCardEditButtonClick} className="Button Button--Square">
                                {isInEditMode ? <IoMdClose className="Button__Icon"/> :
                                    <IoMdCreate className="Button__Icon"/>}
                            </button>
                        </div>

                        <CardModalCardInner
                            currentCard={currentCard}
                            onCardContentInputChange={handleCardContentInputChange}
                            onCardClick={handleCardClick}
                            isBackShown={isBackShown}
                            isInEditMode={isInEditMode}
                        />

                        <span className="CardModal__CardContentIndicator" onClick={handleCardReverse}>
                            {isBackShown ? <IoMdFlash className="CardModal__CardFlashIcon"/> :
                                <IoMdHelp className="CardModal__CardHelpIcon"/>}
                        </span>
                    </div>
                </CardFlipAnimation>
                <div className="CardModal__Controls">
                    <button onClick={handleBackCardButtonClick} className="Button Button--Square"
                    ><IoMdArrowRoundBack className="Button__Icon"/></button>
                    <button onClick={handleNextCardButtonClick} className="Button Button--Square"
                    ><IoMdArrowRoundForward className="Button__Icon"/></button>
                </div>

            </div>
        </Modal>
    );
}

CardModal.propTypes = {
    initialCardId: PropTypes.string.isRequired,
    onModalClose: PropTypes.func.isRequired,
    isCardBackShown: PropTypes.bool.isRequired,
    cards: PropTypes.array.isRequired,
    updateCard: PropTypes.func.isRequired,
};

CardModal.defaultProps = {
    isCardBackShown: false
};

function mapStateToProps(state) {
    return {
        cards: cardsFilteredBySelectedFolderSelector(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateCard: (cardId, card) => dispatch(updateCardAction(cardId, card))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CardModal));
