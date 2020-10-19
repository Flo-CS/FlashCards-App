import PropTypes from "prop-types";
import React, {useState} from "react";

import {IoMdCreate, IoMdFlash, IoMdHelp, IoMdTrash} from "react-icons/io";
import {connect} from "react-redux";
import {moveCardAction, removeCardAction} from "../../../actions/cardsActions";
import {TRASH_FOLDER_ID} from "../../../constants/folders";
import ControlsGroup from "../../controls/group/ControlsGroup";
import CardModal from "../../modal/cardModal/CardModal";
import CardFlipAnimation from "../CardFlipAnimation";

import "./Card.scss";
import CardDropdown from "./CardDropdown";

function Card({frontContent, backContent, id: cardId, folderId, removeCard, moveCard}) {

    const [isBackShown, setIsBackShown] = useState(false);

    function handleCardReverse() {
        setIsBackShown((isBackShown) => !isBackShown);
    }

    function handleCardRemoveButtonClick() {
        // If the folder is in the trash, delete it otherwise move it to the trash
        if (folderId === TRASH_FOLDER_ID) {
            removeCard(cardId);
            return;

        }
        moveCard(cardId, TRASH_FOLDER_ID);

    }

    const [isCardModalShown, setIsCardModalShown] = useState(false);

    function handleCardEditButtonClick() {
        setIsCardModalShown(true);
    }

    function handleModalClose() {
        setIsCardModalShown(false);
    }

    return (
        <CardFlipAnimation isBackShown={isBackShown}>
            <div className="Card">
                {isCardModalShown ? <CardModal initialCardId={cardId} onModalClose={handleModalClose}
                                               isCardBackShown={isBackShown}/> : null}
                <div className="Card__UpControls Card__UpControls--Left">
                    <ControlsGroup>
                        <button className="Button Button--Square" onClick={handleCardEditButtonClick}><IoMdCreate
                            className="Button__Icon"/></button>
                        <button className="Button Button--Square Button--Danger" onClick={handleCardRemoveButtonClick}>
                            <IoMdTrash
                                className="Button__Icon"/></button>
                    </ControlsGroup>
                </div>
                <div className="Card__UpControls Card__UpControls--Right">
                    <CardDropdown cardId={cardId}/>
                </div>
                <div className="Card__Inner">
                    {isBackShown ?
                        (
                            <p className="Card__BackContent">{backContent}</p>
                        ) : (
                            <p className="Card__FrontContent">{frontContent}</p>
                        )
                    }
                </div>
                <span className="Card__ContentIndicator" onClick={handleCardReverse}>{isBackShown ?
                    <IoMdFlash className="Card__FlashIcon"/> :
                    <IoMdHelp className="Card__HelpIcon"/>}</span>
            </div>
        </CardFlipAnimation>);
}

Card.propTypes = {
    frontContent: PropTypes.string.isRequired,
    backContent: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    removeCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        removeCard: (cardId) => dispatch(removeCardAction(cardId)),
        moveCard: (cardId, destinationFolderId) => dispatch(moveCardAction(cardId, destinationFolderId))
    };
}

export default connect(null, mapDispatchToProps)(React.memo(Card));

