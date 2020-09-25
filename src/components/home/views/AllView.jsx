import React, {useEffect} from "react";
import {getCards} from "../../../utils/firestore";

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
    }, [setCards])

    return (<div className="all-view">
        {cards.map((card) => {
            return (<Card key={card.id} {...card}/>)
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