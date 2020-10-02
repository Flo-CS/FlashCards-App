//TODO : REVIEW ENTIRELY THE FOLDERS CODE

import React, {useState} from "react";
import Tree from "rc-tree";

import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"

import "./FoldersTreeView.scss"
import foldersManager from "../../utils/foldersManager";
import {ALL_FOLDER_ID, TRASH_FOLDER_ID} from "../../constants/folders";

function convertFoldersToTreeData(folders, depth = 1) {
    return (
        folders
            .filter((folder) => {
                return (folder.path.split("/").length === depth) // + 1 Because there is a slash after folder path even it is empty
            })
            .map((folder) => {
                const folderSubFolders = getFolderSubFolders(folder, folders)
                let newDepth = depth + 1

                if (folderSubFolders.length === 0) {
                    return {key: folder.id, title: folder.name}
                } else {
                    const children = convertFoldersToTreeData(folderSubFolders, newDepth)

                    // Check if there is children (if it's not the case, it's because two folder have the same beginning name)
                    return {
                        key: folder.id,
                        title: children.length !== 0 ? `${folder.name} - ${folderSubFolders.length}` : folder.name,
                        children: children
                    }


                }

            })
    )
}

function getFolderSubFolders(folder, otherFolders) {
    return otherFolders.filter((otherFolder) => {
        return otherFolder.path.startsWith(folder.path)
            && otherFolder.path !== folder.path
    })
}

function changeFolderAndSubFoldersPathFromFolders(movedFolder, destinationFolder, folders) {
    const isDraggedToAllFolder = destinationFolder.id === ALL_FOLDER_ID

    return folders.map((folder) => {
        const folderDepth = folder.path.split("/").length
        const movedFolderDepth = movedFolder.path.split("/").length

        if (folder.path.startsWith(movedFolder.path) && (folder.path === movedFolder.path || folderDepth !== movedFolderDepth)) {
            const splitFolderPath = folder.path.split("/")
            const splitMovedFolderPath = movedFolder.path.split("/")
            const pathPartNumberToKeep = (splitFolderPath.length - splitMovedFolderPath.length + 1)
            const folderLastPathPart = splitFolderPath.slice(splitFolderPath.length - pathPartNumberToKeep).join("/")


            if (isDraggedToAllFolder) {
                return {...folder, path: folderLastPathPart}
            }

            return {...folder, path: `${destinationFolder.path}/${folderLastPathPart}`}
        }
        return folder
    })
}

function FoldersTreeView({folders, setSelectedFolder}) {
    const treeData = convertFoldersToTreeData(folders)

    const [treeSelectedKeys, setTreeSelectedKeys] = useState([ALL_FOLDER_ID])

    function handleTreeNodeSelect(selectedKeys) {
        //Check that there is one selectedKeys otherwise the selectedFolder will be undefined and it must not be undefined
        if (selectedKeys.length !== 0) {
            setTreeSelectedKeys(selectedKeys)

            const selectedFolder = folders.find((folder) => {
                return folder.id === selectedKeys[0]
            })

            setSelectedFolder(selectedFolder)

        } else {
            setTreeSelectedKeys([ALL_FOLDER_ID])

            const allFolder = folders.find((folder) => {
                return folder.id === ALL_FOLDER_ID
            })

            setSelectedFolder(allFolder)
        }


    }

    function handleTreeNodeDrop(info) {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;

        const dropFolder = foldersManager.getFolder(dropKey)
        const dragFolder = foldersManager.getFolder(dragKey)

        if (dragFolder.id === ALL_FOLDER_ID || dragFolder.id === TRASH_FOLDER_ID) return

        foldersManager.setFolders(changeFolderAndSubFoldersPathFromFolders(dragFolder, dropFolder, folders))


    }

    return <div>
        <Tree treeData={treeData}
              onSelect={handleTreeNodeSelect}
              prefixCls="folders-tree-view"
              onDrop={handleTreeNodeDrop}
              draggable
              switcherIcon={(props) => {
                  if (props.isLeaf) return null
                  return props.expanded ? <IoIosArrowUp className="folders-tree-view__ios-arrow-up-icon"/> :
                      <IoIosArrowDown className="folders-tree-view__ios-arrow-down-icon"/>
              }}
              selectedKeys={treeSelectedKeys}


        />
    </div>
}

export default React.memo(FoldersTreeView)