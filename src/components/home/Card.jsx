import React from "react"

import "./Card.scss"

export default function Card({frontContent, backContent}) {

    return (<div className="card">
        <div className="card__inner">
            <div className="card__controls"></div>
            <div className="card__front-content">{frontContent}</div>
            <div className="card__back-content">{backContent}</div>
        </div>
    </div>)
}