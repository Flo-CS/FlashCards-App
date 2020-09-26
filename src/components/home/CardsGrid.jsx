import React, {useEffect} from "react";
import {connect} from "react-redux";

import "./CardsGrid.scss"

import Card from "./Card";

import {cardsSelectors} from "../../selectors/cardsSelectors";
import {setCardsAction} from "../../actions/cardsActions";
import {getCards} from "../../utils/firestore";


function CardsGrid({cards, setCards}) {
    // Get all cards at beginning
    useEffect(() => {
        getCards().then((doc) => {
            const data = doc.data()
            const cards = data.cards

            setCards(cards)
        })
    }, [setCards])

    return (
        <div className="cards-grid" >
            {cards.map((card) => {
                return (<Card  key={card.id} {...card}/>)
            })}
        </div>
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