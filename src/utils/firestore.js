import {fbAuthentication, fbFirestore} from "./firebase";

export function firestoreGetUserData() {
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).get()
}

export function firestoreSetCards(cards) {
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).set({cards: cards}, {merge: true})
}

export function firestoreSetFolders(folders){
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).set({folders: folders}, {merge: true})
}