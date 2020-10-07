import {fbAuthentication} from "./firebase";
import {firestoreSetUserData} from "./firestore";
import {DEFAULT_USER_FOLDERS} from "../constants/folders";

export function loginUserWithEmailAndPassword(email, password) {
    return fbAuthentication.signInWithEmailAndPassword(email, password)
}

export function registerUserWithEmailAndPassword(email, password) {

    return fbAuthentication.createUserWithEmailAndPassword(email, password).then(() => {
        return firestoreSetUserData({cards: [], folders: DEFAULT_USER_FOLDERS})
    })

}

