import React from "react";
import Tree from "rc-tree";

import "./FoldersTreeView.scss"

function convertFoldersToTreeData(folders, depth = 1) {
    return (
        folders
            .filter((folder) => {
                return (folder.path.split("/").length === depth)
            })
            .map((folder) => {
                const folderSubFolders = getFolderSubFolders(folder, folders)

                if (folderSubFolders.length === 0) {
                    return {key: folder.id, title: folder.name}
                } else {
                    return {
                        key: folder.id,
                        title: folder.name,
                        children: convertFoldersToTreeData(folderSubFolders, depth += 1)
                    }
                }
            })
    )
}

function getFolderSubFolders(folder, otherFolders) {
    return otherFolders.filter((otherFolder) => {
        return otherFolder.path.startsWith(folder.path) && otherFolder.path !== folder.path
    })
}

export default function FoldersTreeView({folders, setSelectedFolder}) {
    const treeData = convertFoldersToTreeData(folders)


    function onSelect(selectedKeys, info) {
        //Check that there is one selectedKeys otherwise the selectedFolder is undefined and it cannot be undefined
        if (selectedKeys.length !== 0) {
            setSelectedFolder(folders.find((folder) => {
                return folder.id === selectedKeys[0]
            }))
        } else {
            setSelectedFolder(null)
        }
    }

    return <div>
        <Tree defaultExpandAll
              treeData={treeData}
              onSelect={onSelect}
        />
    </div>
}

