import React, {useEffect} from "react";
import {getCards} from "../../../helpers/database";

import {removeCardAction, setCardsAction} from "../../../actions/cardsActions";
import {cardsSelectors} from "../../../selectors/cardsSelectors";
import {connect} from "react-redux";

import "./AllView.scss"

import Card from "../Card";


function AllView({cards, setCards, removeCard}) {
    // Get all cards at beginning
    useEffect(() => {
        getCards().then((doc) => {
            const data = doc.data()
            const cards = data.cards

            setCards(cards)
        })
    }, [])

    function handleRemoveCard(cardId) {
        const cardsWithoutRemoved = cards.filter((card) => {
            return card.id !== cardId
        })

        setCards(cardsWithoutRemoved).then(() => {
            removeCard(cardId)
        })
    }

    return (<div className="all-view">
        {cards.map((card) => {
            return (<Card key={card.id} onRemoveCard={handleRemoveCard} {...card}/>)
        })}
    </div>)
}

function mapStateToProps(state) {
    return {
        cards: cardsSelectors(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeCard: (cardId) => dispatch(removeCardAction(cardId)),
        setCards: (cards) => dispatch(setCardsAction(cards))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllView)