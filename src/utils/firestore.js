import {fbAuthentication, fbFirestore} from "./firebase";
import store from "../store/store";

export function firestoreGetUserData() {
    console.log("Read from firestore")
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).get()
}

export function firestoreSetUserData(data) {
    console.log("Write to firestore")
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).set(data)
}

export function firestoreSetCards(cards) {
    console.log("Write to firestore")
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).set({cards: cards}, {merge: true})
}

export function firestoreSetFolders(folders) {
    console.log("Write to firestore")
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).set({folders: folders}, {merge: true})
}


export function saveDataToFirestore() {
    const appState = store.getState()

    return firestoreSetUserData({
            folders: appState.folders.foldersList,
            cards: appState.cards.cardsList
        }
    )

}