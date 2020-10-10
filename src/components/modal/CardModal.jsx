import Modal from "./Modal";
import React, {useEffect, useState} from "react";

import {IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdClose, IoMdCreate, IoMdFlash, IoMdHelp} from "react-icons/io"

import "./CardModal.scss"
import {CSSTransition, SwitchTransition} from "react-transition-group";
import cardsFunctions from "../../utils/cardsFunctions";
import Button from "../controls/buttons/Button";


export default function CardModal({initialCardId, onModalClose, isCardInEditMode = false, isCardBackShown = false}) {
    const [currentCard, setCurrentCard] = useState({})
    const [isBackShown, setIsBackShown] = useState(isCardBackShown)
    const [isInEditMode, setIsInEditMode] = useState(isCardInEditMode)


    useEffect(() => {
        setCurrentCard(cardsFunctions.getCard(currentCard.id || initialCardId))
    }, [currentCard.id, initialCardId])

    // We use mouse down to not fire the event when the user hold the click and move mouse
    function handleCardReverse() {
        setIsBackShown((isBackShown) => !isBackShown)
    }

    function handleCardClick(e) {
        if (isInEditMode) {
            // Exit edit mode only if don't click on the textarea
            if (e.target.nodeName.toLowerCase() !== "textarea") {
                setIsInEditMode(false)
                cardsFunctions.updateCard(currentCard.id, {
                    frontContent: currentCard.frontContent,
                    backContent: currentCard.backContent
                })
            }
        }
    }

    function handleCardEditButtonClick() {
        setIsInEditMode((isInEditMode) => !isInEditMode)
        // The condition is not inverted even we want update currentCard when we are not anymore in edit mode because the isInEditMode state is not updated right now
        if (isInEditMode) {
            cardsFunctions.updateCard(currentCard.id, {
                frontContent: currentCard.frontContent,
                backContent: currentCard.backContent
            })
        }
    }

    function handleCardFrontContentInputChange(e) {
        e.persist()
        setCurrentCard((card) => {
            return {...card, frontContent: e.target.value}
        })
    }

    function handleCardBackContentInputChange(e) {
        e.persist()
        setCurrentCard((card) => {
            return {...card, backContent: e.target.value}
        })
    }

    function handleNextCardButtonClick() {
        const nextCard = cardsFunctions.getNextCard(currentCard.id)
        setCurrentCard(nextCard)
    }

    function handleBackCardButtonClick() {
        const backCard = cardsFunctions.getBackCard(currentCard.id)
        setCurrentCard(backCard)
    }

    function handleModalClose() {
        onModalClose()
    }


    return (<Modal onModalClose={handleModalClose}>
            <div className="card-modal">
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition key={isBackShown}
                                   addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                                   classNames="card-modal__card--flip">
                        <div className="card-modal__card">
                            <Button onClick={handleCardEditButtonClick} Icon={isInEditMode ?
                                IoMdClose  : IoMdCreate} color="Secondary" size="Square"/>

                            <div className="card-modal__card-inner"
                                 onClick={handleCardClick}>
                                {isBackShown ?
                                    (
                                        isInEditMode ? (
                                            <textarea className="card-modal__card-textarea"
                                                      value={currentCard.backContent || ""}
                                                      onChange={handleCardBackContentInputChange}
                                                      autoFocus={true}
                                            />
                                        ) : (
                                            <p className="card-modal__card-back-content">{currentCard.backContent}</p>
                                        )

                                    ) : (
                                        isInEditMode ? (
                                            <textarea className="card-modal__card-textarea"
                                                      value={currentCard.frontContent || ""}
                                                      onChange={handleCardFrontContentInputChange}
                                                      autoFocus={true}
                                            />
                                        ) : (
                                            <p className="card-modal__card-front-content">{currentCard.frontContent}</p>
                                        )
                                    )
                                }
                            </div>
                            <span className="card-modal__card-content-indicator-icon"
                                  onClick={handleCardReverse}>{isBackShown ?
                                <IoMdFlash className="card-modal__md-flash-icon"/> :
                                <IoMdHelp className="card-modal__md-help-icon"/>}</span>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <div className="card-modal__controls">
                    <Button onClick={handleBackCardButtonClick} color="Tertiary" size="Square" Icon={IoMdArrowRoundBack}/>
                    <Button onClick={handleNextCardButtonClick} color="Tertiary" size="Square" Icon={IoMdArrowRoundForward}/>
                </div>

            </div>
        </Modal>
    )
}