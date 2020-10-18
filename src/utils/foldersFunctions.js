export function getFolderById(folders, folderId) {
    return folders.find((folder) => folder.id === folderId);
}

export function getFolderSubFolders(otherFolders, folder) {
    return otherFolders.filter((otherFolder) => {
        return otherFolder.path.startsWith(folder.path);
    });
}

export function convertFolderPathToHumanReadable(folders, folderPath) {
    const splitFolderPath = folderPath.split("/");
    const splitReadableFolderPath = [];

    for (const partFolderId of splitFolderPath) {
        const partFolder = getFolderById(folders, partFolderId);
        // At the app launch when getting data, folders are empty, we need to test if there is a folder
        splitReadableFolderPath.push(partFolder?.name);
    }


    return splitReadableFolderPath.join(" / ");
}

export function getParentFolder(folder) {
    const splitFolderPath = folder.path.split("/");
    const parentFolderId = splitFolderPath.slice(splitFolderPath.length - 2, splitFolderPath.length - 1)[0];

    if (parentFolderId) {
        return getFolderById(parentFolderId);
    }

    return false;
}

