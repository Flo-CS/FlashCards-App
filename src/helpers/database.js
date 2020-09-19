import {fbAuthentication, fbFirestore} from "./firebase";

import store from "../store";

import {setCardsAction} from "../actions/CardsActions";

export function getCards() {
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).get()
        .then((doc) => {
            const data = doc.data()
            const cards = data.cards

            store.dispatch(setCardsAction(cards))
        })
}

export function removeCard(cardId) {

}