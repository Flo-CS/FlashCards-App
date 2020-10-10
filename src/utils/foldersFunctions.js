import store from "../store/store";
import {firestoreSetFolders} from "./firestore";
import {
    addFolderAction,
    removeFolderAction,
    setFoldersAction,
    setSelectedFolderAction,
    updateFolderAction
} from "../actions/foldersActions";

import {mergeArrayOfObjectsByKey} from "./universalFunctions";
import {DEFAULT_SELECTED_FOLDER, SPECIAL_FOLDERS_IDS, TRASH_FOLDER, TRASH_FOLDER_ID} from "../constants/folders";
import cardsFunctions from "./cardsFunctions";

function setFolders(folders) {
    store.dispatch(setFoldersAction(folders))
    return firestoreSetFolders(folders)
}

function addFolder(folder) {
    store.dispatch(addFolderAction(folder))
    return firestoreSetFolders(getFolders())
}

function removeFolder(folderId) {
    const selectedFolder = getSelectedFolder()

    // Interdiction to remove the special folders
    if (SPECIAL_FOLDERS_IDS.includes(selectedFolder.id)) return

    // Move the cards of the deleted folder to the trash
    cardsFunctions.moveCards(selectedFolder.id, TRASH_FOLDER_ID)
    setSelectedFolder(TRASH_FOLDER)


    store.dispatch(removeFolderAction(folderId))
    return firestoreSetFolders(getFolders())
}

function updateFolder(folderId, newFolderData) {
    const folder = getFolder(folderId)
    //Only save if two objects values are different
    let areFoldersDifferent = false;
    for (const key of Object.keys(newFolderData)) {
        if (folder[key] !== newFolderData[key]) {
            areFoldersDifferent = true;
        }
    }

    if (areFoldersDifferent) {
        store.dispatch(updateFolderAction(folderId, {...folder, ...newFolderData}))
        return firestoreSetFolders(getFolders())
    }

    return false
}

function getFolders() {
    return store.getState().folders.foldersList
}

function getSelectedFolder() {
    return store.getState().folders.selectedFolder
}

function setSelectedFolder(folder) {
    return store.dispatch(setSelectedFolderAction(folder))
}

function getFolder(folderId) {
    return store.getState().folders.foldersList.find((folder) => folder.id === folderId)
}

function getFolderSubFolders(folder) {
    const otherFolders = getFolders()

    return otherFolders.filter((otherFolder) => {
        return otherFolder.path.startsWith(folder.path)
    })
}

function moveFolder(movedFolder, destinationFolder) {
    const movedFolderSubFolders = getFolderSubFolders(movedFolder)

    const pathChangedSubFolders = movedFolderSubFolders.map(subFolder => {
        const splitSubFolderPath = subFolder.path.split("/")
        const splitMovedFolderPath = movedFolder.path.split("/")
        const pathPartNumberToKeep = (splitSubFolderPath.length - splitMovedFolderPath.length + 1)
        const subFolderLastPathPart = splitSubFolderPath.slice(splitSubFolderPath.length - pathPartNumberToKeep).join("/")

        // When moved to root
        if (destinationFolder === null) {
            return {...subFolder, path: subFolderLastPathPart}
        }

        return {...subFolder, path: `${destinationFolder.path}/${subFolderLastPathPart}`}
    })

    const folders = getFolders()
    const mergedFolders = mergeArrayOfObjectsByKey(folders, pathChangedSubFolders, "id")

    return setFolders(mergedFolders)
}

function convertFolderPathToHumanReadable(folderPath) {
    const splitFolderPath = folderPath.split("/")
    const splitReadableFolderPath = []


    for (const partFolderId of splitFolderPath) {
        const partFolder = getFolder(partFolderId)
        // At the app launch, folders are not accessible then we need to provide a callback
        splitReadableFolderPath.push(partFolder ? partFolder.name : DEFAULT_SELECTED_FOLDER.name)
    }

    return splitReadableFolderPath.join(" / ")
}

function getParentFolder(folder) {
    const splitFolderPath = folder.path.split("/")
    const parentFolderId = splitFolderPath.slice(splitFolderPath.length - 2, splitFolderPath.length - 1)[0]

    if (parentFolderId) {
        return getFolder(parentFolderId)
    }

    return false
}


export default {
    setFolders,
    addFolder,
    removeFolder,
    updateFolder,
    getFolders,
    getSelectedFolder,
    setSelectedFolder,
    getFolder,
    getFolderSubFolders,
    moveFolder,
    convertFolderPathToHumanReadable,
    getParentFolder
}