import {fbAuthentication, fbFirestore} from "./firebase";

export function getCards() {
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).get()
}

export function setCards(cards) {
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).set({cards: cards})
}