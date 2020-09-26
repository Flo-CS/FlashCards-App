import {fbAuthentication, fbFirestore} from "./firebase";

export function firestoreGetCards() {
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).get()
}

export function firestoreSetCards(cards) {
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).set({cards: cards}, {merge: true})
}