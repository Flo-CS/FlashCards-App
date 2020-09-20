import React, {useEffect} from "react";
import {getCards, setCards} from "../../../helpers/database";
import store from "../../../store/store";
import {removeCardAction, setCardsAction} from "../../../actions/cardsActions";
import {cardsSelectors} from "../../../selectors/cardsSelectors";
import {connect} from "react-redux";

import "./AllView.scss"

import Card from "../Card";
import {cardSchemaFactory} from "../../../helpers/schemaFactories";


function AllView({cards, removeCard}) {
    useEffect(() => {
        getCards().then((doc) => {
            const data = doc.data()
            const cards = data.cards

            store.dispatch(setCardsAction(cards))
        })
    }, [])

    function handleRemoveCard(cardId) {
        const _cards = cards.filter((card) => {
            return card.id !== cardId
        })

        setCards(_cards).then(()=> {
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
        removeCard: (cardId) => dispatch(removeCardAction(cardId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllView)