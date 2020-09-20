import React, {useEffect} from "react";
import {getCards} from "../../../helpers/database";
import store from "../../../store/Store";
import {setCardsAction} from "../../../actions/CardsActions";
import {cardsSelectors} from "../../../selectors/CardsSelectors";
import {connect} from "react-redux";

import "./AllView.scss"

import Card from "../Card";
import {cardSchemaFactory} from "../../../helpers/schemaFactories";


function AllView({cards}) {
    /*useEffect(() => {
        getCards().then((doc) => {
            const data = doc.data()
            const cards = data.cards

            store.dispatch(setCardsAction(cards))
        })
    }, [])*/

    useEffect(() => {
        store.dispatch(setCardsAction([
            cardSchemaFactory("coucou", "hello", 5, "/machin"),
            cardSchemaFactory("coucou", "hello", 5, "/machin"),
            cardSchemaFactory("coucou", "hello", 5, "/machin")
        ]))
    }, [])


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

export default connect(mapStateToProps)(AllView)