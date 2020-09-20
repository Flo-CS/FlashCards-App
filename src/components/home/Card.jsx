import React, {useState} from "react"

import "./Card.scss"

import {IoMdTrash, IoMdCreate} from "react-icons/io";

export default function Card({frontContent, backContent}) {
    const [isBackShown, setIsBackShown] = useState(false)

    function handleCardClick() {
        setIsBackShown((isBackShown) => {
            return !isBackShown
        })
    }

    return (<div className="card">
        <div className="card__controls">
            <button className="card__button"><IoMdCreate className="card__md-edit-icon"/></button>
            <button className="card__button"><IoMdTrash className="card__md-trash-icon"/></button>
        </div>
        <div className="card__inner" onClick={handleCardClick}>
            {!isBackShown ?
                <div className="card__front-content">{frontContent}</div> :
                <div className="card__back-content">{backContent}</div>}
        </div>
    </div>)
}