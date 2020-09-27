import React from "react";

import "./CardsGrid.scss"

import Card from "./Card";

export default function CardsGrid({cards}) {

    return <div className="cards-grid">
        {cards.map((card) => {
            return (
                <Card  {...card} key={card.id}/>
            )
        })}
    </div>
}

