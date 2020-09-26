import Modal from "./Modal";
import React, {useEffect, useState} from "react";

import {IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdClose, IoMdCreate} from "react-icons/io"

import "./CardModal.scss"
import {CSSTransition, SwitchTransition} from "react-transition-group";
import cardsManager from "../../utils/cardsManager";


export default function CardModal({initialCardId, onModalClose, isCardInEditMode = false, isCardBackShown = false}) {
    const [currentCard, setCurrentCard] = useState({})
    const [isBackShown, setIsBackShown] = useState(isCardBackShown)
    const [isInEditMode, setIsInEditMode] = useState(isCardInEditMode)


    useEffect(() => {
        setCurrentCard(cardsManager.getCard(currentCard.id || initialCardId))
    }, [currentCard.id, initialCardId])

    // We use mouse down to not fire the event when the user hold the click and move mouse
    function handleCardMouseDown(e) {
        if (isInEditMode) {
            // Exit edit mode only if don't click on the textarea
            if (e.target.nodeName.toLowerCase() !== "textarea") {
                setIsInEditMode(false)
                cardsManager.updateCard(currentCard.id, {
                    frontContent: currentCard.frontContent,
                    backContent: currentCard.backContent
                })
            }
            return;
        }

        setIsBackShown((isBackShown) => !isBackShown)
    }

    function handleCardEditButtonClick() {
        setIsInEditMode((isInEditMode) => !isInEditMode)
        // The condition is not inverted even we want update currentCard when we are not anymore in edit mode because the isInEditMode state is not updated right now
        if (isInEditMode) {
            cardsManager.updateCard(currentCard.id, {
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
        const nextCard = cardsManager.getNextCard(currentCard.id)
        setCurrentCard(nextCard)
    }

    function handleBackCardButtonClick() {
        const backCard = cardsManager.getBackCard(currentCard.id)
        setCurrentCard(backCard)
    }

    function handleModalClose() {
        onModalClose()
    }


    return (<Modal customStyle={{width: "100%", height: "80%", maxWidth: "540px", maxHeight: "540px"}} isModalShown={true}
                   onModalClose={handleModalClose}>
            <div className="card-modal">
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition key={isBackShown}
                                   addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                                   classNames="card-modal__card--flip">
                        <div className="card-modal__card">
                            <button className="card-modal__card-button"
                                    onClick={handleCardEditButtonClick}>{isInEditMode ?
                                <IoMdClose className="card-modal__md-close-icon"/> : <IoMdCreate
                                    className="card-modal__md-edit-icon"/>}</button>
                            <div className="card-modal__card-inner" onMouseDown={handleCardMouseDown}>
                                {isBackShown ?
                                    (
                                        isInEditMode ? (
                                            <textarea className="card-modal__card-textarea"
                                                      value={currentCard.backContent || ""}
                                                      onChange={handleCardBackContentInputChange}
                                            />
                                        ) : (
                                            <p className="card-modal__card-back-content">{currentCard.backContent}</p>
                                        )

                                    ) : (
                                        isInEditMode ? (
                                            <textarea className="card-modal__card-textarea"
                                                      value={currentCard.frontContent || ""}
                                                      onChange={handleCardFrontContentInputChange}/>
                                        ) : (
                                            <p className="card-modal__card-front-content">{currentCard.frontContent}</p>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <div className="card-modal__controls">
                    <button className="card-modal__button" onClick={handleBackCardButtonClick}><IoMdArrowRoundBack
                        className="card-modal__md-arrow-back-icon"/></button>
                    <button className="card-modal__button" onClick={handleNextCardButtonClick}><IoMdArrowRoundForward
                        className="card-modal__md-arrow-next-icon"/></button>
                </div>
            </div>
        </Modal>
    )
}