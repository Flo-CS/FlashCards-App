import store from "../store/store";
import {firestoreSetFolders} from "./firestore";
import {addFolderAction, removeFolderAction, setFoldersAction, updateFolderAction} from "../actions/foldersActions";

function setFolders(folders) {
    store.dispatch(setFoldersAction(folders))
    return firestoreSetFolders(folders)
}

function addFolder(folder) {
    store.dispatch(addFolderAction(folder))
    return firestoreSetFolders(getFoldersList())
}

function removeFolder(folderId) {
    store.dispatch(removeFolderAction(folderId))
    return firestoreSetFolders(getFoldersList())
}

function updateFolder(folderId, newFolderData) {
    const folder = getFolderFromFolderList(folderId)
    //Only save if two objects values are different
    let areFoldersDifferent = false;
    for (const key of Object.keys(newFolderData)) {
        if (folder[key] !== newFolderData[key]) {
            areFoldersDifferent = true;
        }
    }

    if (areFoldersDifferent) {
        store.dispatch(updateFolderAction(folderId, {...folder, ...newFolderData}))
        return firestoreSetFolders(getFoldersList())
    }

    return false
}

function getFoldersList() {
    return store.getState().folders.foldersList
}

function getSelectedFolder() {
    return store.getState().folders.selectedFolder
}

function getFolderFromFolderList(folderId) {
    const folder = store.getState().folders.foldersList.filter((folder) => folder.id === folderId)
    // If there is a result, we take the first element of the array returned because filter give an array
    if (folder.length !== 0) {
        return folder[0]
    }
    return false
}

export default {
    setFolders,
    addFolder,
    removeFolder,
    updateFolder,
    getFoldersList,
    getSelectedFolder,
    getFolderFromFolderList
}