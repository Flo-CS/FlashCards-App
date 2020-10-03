//TODO : REVIEW ENTIRELY THE FOLDERS CODE

import React, {useState} from "react";
import Tree from "rc-tree";

import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"

import "./FoldersTreeView.scss"
import foldersManager from "../../utils/folders";
import {ALL_FOLDER_ID, UNMOVABLE_FOLDERS_IDS} from "../../constants/folders";


function convertFoldersToTreeData(folders, depth = 1) {
    return (
        folders
            .filter((folder) => {
                return (folder.path.split("/").length === depth)
            })
            .map((folder) => {
                const folderSubFolders = foldersManager.getFolderSubFolders(folder)
                let newDepth = depth + 1

                if (folderSubFolders.length === 0) {
                    return {key: folder.id, title: folder.name}
                } else {
                    const children = convertFoldersToTreeData(folderSubFolders, newDepth)

                    return {
                        key: folder.id,
                        title: `${folder.name} - ${folderSubFolders.length - 1}`,
                        children: children
                    }
                }
            })
    )
}


function FoldersTreeView({folders}) {
    const treeData = convertFoldersToTreeData(folders)
    const [treeSelectedKeys, setTreeSelectedKeys] = useState([ALL_FOLDER_ID])

    function handleTreeNodeSelect(selectedKeys) {
        //Check that there is one selectedKeys otherwise the selectedFolder will be undefined and it must not be undefined
        if (selectedKeys.length !== 0) {
            setTreeSelectedKeys(selectedKeys)
            const selectedFolder = foldersManager.getFolder(selectedKeys[0])
            foldersManager.setSelectedFolder(selectedFolder)
        } else {
            setTreeSelectedKeys([ALL_FOLDER_ID])
            const allFolder = foldersManager.getFolder(ALL_FOLDER_ID)
            foldersManager.setSelectedFolder(allFolder)
        }
    }

    function handleTreeNodeDrop(info) {
        const dropNode = info.node;
        const dragNode = info.dragNode;

        const dropFolder = foldersManager.getFolder(dropNode.key)
        const dragFolder = foldersManager.getFolder(dragNode.key)

        console.log(info)

        const splitDropNodePos = dropNode.pos.split("-")
        const dropToRoot = !dropNode.dragOver && splitDropNodePos.length === 2 && splitDropNodePos[0] === "0"

        if (UNMOVABLE_FOLDERS_IDS.includes(dragFolder.id)) {
            console.warn("You can't move this folder")
        } else if (dropToRoot) {
            foldersManager.moveFolder(dragFolder, false)
        } else {
            foldersManager.moveFolder(dragFolder, dropFolder)
        }
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