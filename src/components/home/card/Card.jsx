import React, {useState} from "react"

import "./Card.scss"

import {IoMdCreate, IoMdFlash, IoMdHelp, IoMdTrash} from "react-icons/io";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import cardsFunctions from "../../../utils/cardsFunctions";
import CardModal from "../../modal/CardModal";
import CardMoreDropdownButton from "./CardDropdownButton";
import Button from "../../controls/buttons/Button";

function Card({frontContent, backContent, id: cardId}) {

    const [isBackShown, setIsBackShown] = useState(false)
    const [isCardModalShown, setIsCardModalShown] = useState(false)

    function handleCardReverse() {
        setIsBackShown((isBackShown) => !isBackShown)
    }

    function handleCardRemoveButtonClick() {
        cardsFunctions.removeCard(cardId)
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
                        <Button onClick={handleCardEditButtonClick} Icon={IoMdCreate} color="Secondary" size="Square"/>
                        <Button onClick={handleCardRemoveButtonClick} Icon={IoMdTrash} color="Danger" size="Square"/>

                    </div>
                    <div className="card__up-controls-right">
                        <CardMoreDropdownButton cardId={cardId}/>
                    </div>
                    <div className="card__inner">
                        {isBackShown ?
                            (
                                <p className="card__back-content">{backContent}</p>
                            ) : (
                                <p className="card__front-content">{frontContent}</p>
                            )
                        }
                    </div>
                    <div className="card__down-controls-right">
                        <span className="card__content-indicator-icon" onClick={handleCardReverse}>{isBackShown ?
                            <IoMdFlash className="card__md-flash-icon"/> :
                            <IoMdHelp className="card__md-help-icon"/>}</span>
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>)
}

export default React.memo(Card)

