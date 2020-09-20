import React, {useState} from "react"

import "./Card.scss"

import {IoMdTrash, IoMdCreate} from "react-icons/io";



function Card({frontContent, backContent, id: cardId, onRemoveCard}) {
    const [isBackShown, setIsBackShown] = useState(false)

    function handleCardClick() {
        setIsBackShown((isBackShown) => {
            return !isBackShown
        })
    }

    function handleCardDeleteButtonClick() {
        onRemoveCard(cardId)
    }

    return (<div className="card">
        <div className="card__controls">
            <button className="card__button"><IoMdCreate className="card__md-edit-icon"/></button>
            <button className="card__button" onClick={handleCardDeleteButtonClick}><IoMdTrash
                className="card__md-trash-icon"/></button>
        </div>
        <div className="card__inner" onClick={handleCardClick}>
            {!isBackShown ?
                <div className="card__front-content">{frontContent}</div> :
                <div className="card__back-content">{backContent}</div>}
        </div>
    </div>)
}

export default React.memo(Card)

