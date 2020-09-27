import React from "react";

import "./CardsGrid.scss"

import Card from "./Card";

export default function CardsGrid({folderFilteredCards}) {

    return <div className="cards-grid">
        {folderFilteredCards.map((card) => {
            return (
                <Card  {...card} key={card.id}/>
            )
        })}
    </div>
}

