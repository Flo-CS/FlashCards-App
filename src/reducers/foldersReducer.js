import {
    ADD_FOLDER_ACTION,
    REMOVE_FOLDER_ACTION,
    SET_FOLDERS_ACTION,
    SET_SELECTED_FOLDER_ACTION,
    UPDATE_FOLDER_ACTION
} from "../constants/actionsTypes";

import {DEFAULT_SELECTED_FOLDER} from "../constants/folders";

const initialState = {foldersList: [], selectedFolder: DEFAULT_SELECTED_FOLDER}

export default function foldersReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FOLDERS_ACTION: {
            return {...state, foldersList: action.payload.folders}
        }
        case ADD_FOLDER_ACTION: {
            return {...state, foldersList: [...state.foldersList, action.payload.folder]}
        }
        case UPDATE_FOLDER_ACTION: {
            return {
                ...state, foldersList: state.foldersList.map(folder => {
                    return folder.id === action.payload.folderId ? action.payload.folder : folder
                })
            }
        }
        case REMOVE_FOLDER_ACTION: {
            return {
                ...state, foldersList: state.foldersList.filter(folder => {
                    return folder.id !== action.payload.folderId
                })
            }
        }
        case SET_SELECTED_FOLDER_ACTION: {
            return {...state, selectedFolder: action.payload.selectedFolder}
        }
        default: {
            return state
        }
    }
}