import React from "react";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';

import {IoIosMove} from "react-icons/io"

import "./CardsGrid.scss"

import Card from "./Card";

import cardsManager from "../../utils/cardsManager";

import arrayMove from "array-move";

const CardDragHandle = SortableHandle(() => {
    return (<span className="card__drag-handle"><IoIosMove className="card__ios-move-icon"/></span>)
})
const SortableCardItem = SortableElement(({card}) => {
    return <div className="card__drag-wrapper">
        <CardDragHandle/>
        <Card  {...card}/>
    </div>
})
const SortableCardsGrid = SortableContainer(({cards}) => {
    return <div className="cards-grid">
        {cards.map((card, index) => {
            return (
                <SortableCardItem key={card.id} card={card} index={index}/>
            )
        })}
    </div>
})


export default function CardsGrid({folderFilteredCards, cards}) {
    // Get all cards at beginning

    function onSortEnd({oldIndex, newIndex}) {
        const sortedFolderFilteredCards = arrayMove(folderFilteredCards, oldIndex, newIndex)
        console.log(sortedFolderFilteredCards)
        cardsManager.setCards(cards)
    }

    return <SortableCardsGrid cards={folderFilteredCards} onSortEnd={onSortEnd} useDragHandle axis="xy"/>
}

