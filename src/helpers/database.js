import {fbAuthentication, fbFirestore} from "./firebase";

export function getCards() {
    return fbFirestore.collection("users_data").doc(fbAuthentication.currentUser.uid).get()
}
