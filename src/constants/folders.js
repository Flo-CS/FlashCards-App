export const ALL_FOLDER_ID = "%all%"
export const TRASH_FOLDER_ID = "%trash%"
export const SPECIAL_FOLDERS_IDS = [ALL_FOLDER_ID, TRASH_FOLDER_ID]

export const DEFAULT_USER_FOLDERS = [
    {
        id: ALL_FOLDER_ID,
        name: "All",
        path: ALL_FOLDER_ID
    }, {
        id: TRASH_FOLDER_ID,
        name: "Trash",
        path: TRASH_FOLDER_ID
    }]

export const DEFAULT_SELECTED_FOLDER = {id: ALL_FOLDER_ID, path: ALL_FOLDER_ID, name: "All"}