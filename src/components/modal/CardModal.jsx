import Modal from "./Modal";
import React, {useEffect, useState} from "react";

import {IoMdArrowRoundForward, IoMdArrowRoundBack} from "react-icons/io"

import "./CardModal.scss"
import {CSSTransition, SwitchTransition} from "react-transition-group";
import cards from "../../utils/cards";


export default function CardModal({initialCardId, onModalClose, isCardInEditMode = true, isCardBackShown = false}) {
    const [currentCard, setCurrentCard] = useState({frontContent: "", backContent: ""})
    const [isBackShown, setIsBackShown] = useState(isCardBackShown)
    const [isInEditMode, setIsInEditMode] = useState(isCardInEditMode)


    useEffect(() => {
        setCurrentCard(cards.getCard(currentCard.id || initialCardId))
    }, [currentCard.id, initialCardId])

    // We use mouse down to not fire the event when the user hold the click and move mouse
    function handleCardMouseDown(e) {
        if (isInEditMode) {

            if (e.target.nodeName.toLowerCase() !== "input") {
                setIsInEditMode(false)
                cards.updateCard(currentCard.id, {
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
            cards.updateCard(currentCard.id, {
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
        const nextCard = cards.getNextCard(currentCard.id)
        setCurrentCard(nextCard)
    }

    function handleBackCardButtonClick() {
        const backCard = cards.getBackCard(currentCard.id)
        setCurrentCard(backCard)
    }

    function handleModalClose() {
        onModalClose()
    }


    return (<Modal width="540px" height="540px" isModalShown={true} onModalClose={handleModalClose}>
            <div className="card-modal">
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition key={isBackShown}
                                   addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                                   classNames="flip">
                        <div className="card-modal__card">
                            <button className="card-modal__card-button" onClick={handleCardEditButtonClick}>E</button>
                            <div className="card-modal__card-inner" onMouseDown={handleCardMouseDown}>
                                {isBackShown ?
                                    (
                                        isInEditMode ? (
                                            <input className="card-modal__card-input" value={currentCard.backContent}
                                                   onChange={handleCardBackContentInputChange}/>
                                        ) : (
                                            <div className="card-modal__card-back-content">{currentCard.backContent}</div>
                                        )

                                    ) : (
                                        isInEditMode ? (
                                            <input className="card-modal__card-input" value={currentCard.frontContent}
                                                   onChange={handleCardFrontContentInputChange}/>
                                        ) : (
                                            <div className="card-modal__card-front-content">{currentCard.frontContent}</div>
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