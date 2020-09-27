import React, {useState} from "react"

import "./Card.scss"

import {IoMdCreate, IoMdTrash, IoMdFlash, IoMdHelp} from "react-icons/io";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import cardsManager from "../../utils/cardsManager";
import CardModal from "../modal/CardModal";

function Card({frontContent, backContent, id: cardId}) {

    const [isBackShown, setIsBackShown] = useState(false)
    const [isCardModalShown, setIsCardModalShown] = useState(false)

    function handleCardClick() {
        setIsBackShown((isBackShown) => !isBackShown)
    }

    function handleCardRemoveButtonClick() {
        cardsManager.removeCard(cardId)
    }

    function handleCardEditButtonClick() {
        setIsCardModalShown(true)
    }

    function handleModalClose() {
        setIsCardModalShown(false)
    }

    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition key={isBackShown}
                           addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                           classNames="card--flip">
                <div className="card">
                    {isCardModalShown ? <CardModal initialCardId={cardId} onModalClose={handleModalClose}
                                                   isCardBackShown={isBackShown}/> : null}
                    <div className="card__up-controls-left">
                        <button className="card__button" onClick={handleCardEditButtonClick}><IoMdCreate
                            className="card__md-edit-icon"/></button>
                        <button className="card__button" onClick={handleCardRemoveButtonClick}><IoMdTrash
                            className="card__md-trash-icon"/></button>
                    </div>
                    <div className="card__inner" onClick={handleCardClick}>
                        {isBackShown ?
                            (
                                <p className="card__back-content">{backContent}</p>
                            ) : (
                                <p className="card__front-content">{frontContent}</p>
                            )
                        }
                    </div>
                    <div className="card__down-controls-right">
                        <span className="card__content-indicator-icon">{isBackShown ? <IoMdFlash className="card__md-flash-icon"/> : <IoMdHelp className="card__md-help-icon"/> }</span>
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>)
}

export default React.memo(Card)

