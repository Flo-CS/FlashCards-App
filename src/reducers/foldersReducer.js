import {
    ADD_FOLDER_ACTION,
    REMOVE_FOLDER_ACTION,
    SET_FOLDERS_ACTION,
    UPDATE_FOLDER_ACTION
} from "../constants/actionsTypes";

const initialState = {foldersList: []}

export default function foldersReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FOLDERS_ACTION: {
            return {...state, foldersList: [action.payload.folders]}
        }
        case ADD_FOLDER_ACTION: {
            return {...state, foldersList: [...state.foldersList, action.payload.folder]}
        }
        case UPDATE_FOLDER_ACTION: {
            return state.foldersList.map(folder => {
                return folder.id === action.payload.folderId ? action.payload.folder : folder
            })
        }
        case REMOVE_FOLDER_ACTION: {
            return state.foldersList.filter(folder => {
                return folder.id !== action.payload.folderId
            })
        }
        default: {
            return state
        }
    }
}