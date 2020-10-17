import {
    ADD_FOLDER_ACTION,
    MOVE_FOLDER_ACTION,
    REMOVE_FOLDER_ACTION,
    SET_FOLDERS_ACTION,
    SET_SELECTED_FOLDER_ACTION,
    UPDATE_FOLDER_ACTION
} from "../constants/actionsTypes";

export function setFoldersAction(folders) {
    return {type: SET_FOLDERS_ACTION, payload: {folders: folders}}
}

export function addFolderAction(folder) {
    return {type: ADD_FOLDER_ACTION, payload: {folder}}
}

export function updateFolderAction(folderId, folder) {
    return {type: UPDATE_FOLDER_ACTION, payload: {folderId, folder: folder}}
}

export function removeFolderAction(folderId) {
    return {type: REMOVE_FOLDER_ACTION, payload: {folderId: folderId}}
}

export function moveFolderAction(movedFolder, destinationFolder) {
    return {type: MOVE_FOLDER_ACTION, payload: {movedFolder, destinationFolder}}
}

export function setSelectedFolderAction(selectedFolder) {
    return {type: SET_SELECTED_FOLDER_ACTION, payload: {selectedFolder: selectedFolder}}
}
