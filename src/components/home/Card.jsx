import React, {useState} from "react"

import "./Card.scss"

import {IoMdTrash, IoMdCreate} from "react-icons/io";
import {CSSTransition, SwitchTransition} from "react-transition-group";

function Card({frontContent, backContent, id: cardId}) {
    const [isBackShown, setIsBackShown] = useState(false)

    function handleCardClick() {
        setIsBackShown((isBackShown) => !isBackShown)
    }

    function handleCardDeleteButtonClick() {

    }


    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition key={isBackShown}
                           addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                           classNames="flip">
                <div className="card">
                    <div className="card__up-controls">
                        <button className="card__button"><IoMdCreate
                            className="card__md-edit-icon"/></button>
                        <button className="card__button" onClick={handleCardDeleteButtonClick}><IoMdTrash
                            className="card__md-trash-icon"/></button>
                    </div>
                    <div className="card__inner" onClick={handleCardClick}>
                        {isBackShown ?
                            (
                                <div className="card__back-content">{backContent}</div>
                            ) : (
                                <div className="card__front-content">{frontContent}</div>
                            )
                        }
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>)
}

export default React.memo(Card)

