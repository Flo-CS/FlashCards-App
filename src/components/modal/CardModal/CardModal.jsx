import Modal from "../Modal";
import PropTypes from "prop-types"
import React, {useCallback, useEffect, useState} from "react";

import {IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdClose, IoMdCreate, IoMdFlash, IoMdHelp} from "react-icons/io"

import "./CardModal.scss"
import cardsFunctions from "../../../utils/cardsFunctions";
import Button from "../../controls/buttons/Button";
import CardModalCardInner from "./CardModalCardInner";
import CardFlipAnimation from "../../home/card/CardFlipAnimation";


function CardModal({initialCardId, onModalClose, isCardBackShown,}) {
    const [isBackShown, setIsBackShown] = useState(isCardBackShown)
    const [isInEditMode, setIsInEditMode] = useState(true)
    const [currentCard, setCurrentCard] = useState({})

    useEffect(() => {
        setCurrentCard(cardsFunctions.getCard(initialCardId))
    }, [initialCardId])


    function handleSaveCard() {
        cardsFunctions.updateCard(currentCard.id, {
            frontContent: currentCard.frontContent,
            backContent: currentCard.backContent
        })
    }

    // Card controls
    function handleCardContentInputChange(newValue) {
        if (isBackShown) {
            setCurrentCard((card) => {
                return {...card, backContent: newValue}
            })
        } else {
            setCurrentCard((card) => {
                return {...card, frontContent: newValue}
            })
        }
    }

    function handleCardEditButtonClick() {
        setIsInEditMode((isInEditMode) => !isInEditMode)
        if (isInEditMode) {
            handleSaveCard()
        }
    }

    // Card behavior
    function handleCardClick(e) {
        if (isInEditMode) {
            // Exit edit mode only if don't click on the textarea
            if (e.target.nodeName.toLowerCase() !== "textarea") {
                setIsInEditMode(false)
                handleSaveCard()
            }
        }
    }

    const handleCardReverse = useCallback(() => {
        setIsBackShown((isBackShown) => !isBackShown)
    }, []);


    // Modal controls
    const handleNextCardButtonClick = useCallback(() => {
        const nextCard = cardsFunctions.getNextCard(currentCard.id)
        setCurrentCard(nextCard)
    }, [currentCard.id]);

    const handleBackCardButtonClick = useCallback(() => {
        const backCard = cardsFunctions.getBackCard(currentCard.id)
        setCurrentCard(backCard)
    }, [currentCard.id]);

    // Modal behavior
    const handleModalClose = useCallback(() => {
        onModalClose()
    }, [onModalClose]);


    return (<Modal onModalClose={handleModalClose}>
            <div className="CardModal">
                <CardFlipAnimation isBackShown={isBackShown}>
                    <div className="CardModal__Card">
                        <div className="CardModal__CardControls">
                            <Button onClick={handleCardEditButtonClick} Icon={isInEditMode ? IoMdClose : IoMdCreate}
                                    color="Secondary" size="Square"/>
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
                    <Button onClick={handleBackCardButtonClick} color="Tertiary" size="Square"
                            Icon={IoMdArrowRoundBack}/>
                    <Button onClick={handleNextCardButtonClick} color="Tertiary" size="Square"
                            Icon={IoMdArrowRoundForward}/>
                </div>

            </div>
        </Modal>
    )
}

CardModal.propTypes = {
    initialCardId: PropTypes.string.isRequired,
    onModalClose: PropTypes.func.isRequired,
    isCardBackShown: PropTypes.bool.isRequired,
};

export default React.memo(CardModal)
