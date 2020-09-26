export function foldersSelector(state) {
    return state.folders.foldersList
}

export function folderSelector(state, folderId) {
    return state.folders.foldersList.filter((folder) => folder.id === folderId)
}