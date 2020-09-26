import {fbAuthentication} from "./firebase";

export function loginUserWithEmailAndPassword(email, password) {
    return fbAuthentication.signInWithEmailAndPassword(email, password)
}

export function registerUserWithEmailAndPassword(email, password) {
    return fbAuthentication.createUserWithEmailAndPassword(email, password)
}

