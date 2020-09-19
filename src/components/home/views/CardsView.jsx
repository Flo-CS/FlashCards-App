import React, {useEffect} from "react";
import {getCards} from "../../../helpers/database";
import store from "../../../store/Store";
import {setCardsAction} from "../../../actions/CardsActions";
import {cardsSelectors} from "../../../selectors/CardsSelectors";
import {connect} from "react-redux";

function CardsView({cards}) {

    useEffect(() => {
        getCards().then((doc) => {
            const data = doc.data()
            const cards = data.cards

            store.dispatch(setCardsAction(cards))
        })
    }, [])

    return (<div className="cards-view">
        <p style={{wordBreak: "break-all"}}>{JSON.stringify(cards)}</p>
    </div>)
}

function mapStateToProps(state) {
    return {
        cards: cardsSelectors(state),
    }
}

export default connect(mapStateToProps)(CardsView)