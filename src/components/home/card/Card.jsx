import React, {useState} from "react"
import PropTypes from "prop-types"

import "./Card.scss"

import {IoMdCreate, IoMdFlash, IoMdHelp, IoMdTrash} from "react-icons/io";
import cardsFunctions from "../../../utils/cardsFunctions";
import CardModal from "../../modal/CardModal/CardModal";
import CardFlipAnimation from "./CardFlipAnimation";
import CardDropdown from "./CardDropdown";
import ControlsGroup from "../../controls/group/ControlsGroup";

function Card({frontContent, backContent, id: cardId}) {

    const [isBackShown, setIsBackShown] = useState(false)

    function handleCardReverse() {
        setIsBackShown((isBackShown) => !isBackShown)
    }

    function handleCardRemoveButtonClick() {
        cardsFunctions.removeCard(cardId)
    }

    const [isCardModalShown, setIsCardModalShown] = useState(false)

    function handleCardEditButtonClick() {
        setIsCardModalShown(true)
    }

    function handleModalClose() {
        setIsCardModalShown(false)
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
        </CardFlipAnimation>)
}

Card.propTypes = {
    frontContent: PropTypes.string.isRequired,
    backContent: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default React.memo(Card)

