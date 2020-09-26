import React, {useEffect} from "react";
import {connect} from "react-redux";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';

import {IoIosMove} from "react-icons/io"

import "./CardsGrid.scss"

import Card from "./Card";

import {cardsSelectors} from "../../selectors/cardsSelectors";
import {setCardsAction} from "../../actions/cardsActions";
import {firestoreGetCards} from "../../utils/firestore";
import cardsManager from "../../utils/cardsManager";

import arrayMove from "array-move";

const CardDragHandle = SortableHandle(() => {
    return (<span className="card__drag-handle"><IoIosMove className="card__ios-move-icon"/></span>)
})
const SortableCardItem = SortableElement(({card}) => {
        return (<div className="card__drag-wrapper">
            <CardDragHandle/>
            <Card  {...card}/>
        </div>)
    }
)

const SortableCardsGrid = SortableContainer(({cards}) => {
    return (<div className="cards-grid">
        {cards.map((card, index) => {
            return (
                <SortableCardItem key={card.id} card={card} index={index}/>
            )
        })}
    </div>)
})


function CardsGrid({cards, setCards}) {

    // Get all cards at beginning
    useEffect(() => {
        firestoreGetCards().then((doc) => {
            const data = doc.data()
            const cards = data.cards
            setCards(cards)
        })
    }, [setCards])


    function onSortEnd({oldIndex, newIndex}) {
        cardsManager.setCards(arrayMove(cards, oldIndex, newIndex))
    }


    return (
        <SortableCardsGrid cards={cards} onSortEnd={onSortEnd} useDragHandle axis="xy"/>
    )

}

function mapStateToProps(state) {
    return {
        cards: cardsSelectors(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCards: (cards) => dispatch(setCardsAction(cards))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsGrid)