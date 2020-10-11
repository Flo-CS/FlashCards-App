export const ALL_FOLDER_ID = "%all%"
export const TRASH_FOLDER_ID = "%trash%"
export const SPECIAL_FOLDERS_IDS = [ALL_FOLDER_ID, TRASH_FOLDER_ID]

export const ALL_FOLDER = {
    id: ALL_FOLDER_ID,
    name: "All",
    path: ALL_FOLDER_ID
}
export const TRASH_FOLDER = {
    id: TRASH_FOLDER_ID,
    name: "Trash",
    path: TRASH_FOLDER_ID
}
export const DEFAULT_USER_FOLDERS = [ALL_FOLDER, TRASH_FOLDER]

export const DEFAULT_SELECTED_FOLDER = ALL_FOLDER