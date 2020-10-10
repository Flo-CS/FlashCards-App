import React from "react";

import "./CardsGrid.scss"

import Card from "./card/Card";

export default function CardsGrid({cards}) {

    return <div className="CardsGrid">
        {cards.map((card) => {
            return (
                <Card  {...card} key={card.id}/>
            )
        })}
    </div>
}

