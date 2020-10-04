//TODO : REVIEW ENTIRELY THE FOLDERS CODE

import React, {useEffect, useState} from "react";
import Tree from "rc-tree";

import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"

import "./FoldersTree.scss"
import foldersFunctions from "../../utils/foldersFunctions";
import {ALL_FOLDER_ID, SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import cardsFunctions from "../../utils/cardsFunctions";
import {foldersSelector} from "../../selectors/foldersSelectors";
import {connect} from "react-redux";
import {cardsSelectors} from "../../selectors/cardsSelectors";


function convertFoldersToTreeData(folders, depth = 1) {
    return (
        folders
            .filter((folder) => {
                return (folder.path.split("/").length === depth)
            })
            .map((folder) => {
                const folderSubFolders = foldersFunctions.getFolderSubFolders(folder)
                let newDepth = depth + 1

                const children = convertFoldersToTreeData(folderSubFolders, newDepth)

                return {
                    key: folder.id,
                    title: `${folder.name} - ${cardsFunctions.countCardsByFolderId(folder.id)}`,
                    children: children

                }

            })
    )
}


function FoldersTree({folders, cards}) {
    const [treeData, setTreeData] = useState(convertFoldersToTreeData(folders))

    // We need to change the tree data also when cards are changed because we count how much cards there is in each folder
    useEffect(() => {
        setTreeData(convertFoldersToTreeData(folders))
    }, [folders, cards])

    const [treeSelectedKeys, setTreeSelectedKeys] = useState([ALL_FOLDER_ID])

    function handleTreeNodeSelect(selectedKeys) {
        //Check that there is one selectedKeys otherwise the selectedFolder will be undefined and it must not be undefined
        if (selectedKeys.length !== 0) {
            setTreeSelectedKeys(selectedKeys)
            const selectedFolder = foldersFunctions.getFolder(selectedKeys[0])
            foldersFunctions.setSelectedFolder(selectedFolder)
        } else {
            setTreeSelectedKeys([ALL_FOLDER_ID])
            const allFolder = foldersFunctions.getFolder(ALL_FOLDER_ID)
            foldersFunctions.setSelectedFolder(allFolder)
        }
    }

    function handleTreeNodeDrop(info) {
        const dropNode = info.node;
        const dragNode = info.dragNode;

        const dropFolder = foldersFunctions.getFolder(dropNode.key)
        const dragFolder = foldersFunctions.getFolder(dragNode.key)


        const splitDropNodePos = dropNode.pos.split("-")
        const dropToRoot = !dropNode.dragOver && splitDropNodePos.length === 2 && splitDropNodePos[0] === "0"

        if (SPECIAL_FOLDERS_IDS.includes(dragFolder.id)) {
            console.warn("You can't move this folder")
        } else if (dropToRoot) {
            foldersFunctions.moveFolder(dragFolder, false)
        } else {
            foldersFunctions.moveFolder(dragFolder, dropFolder)
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

function mapStateToProps(state) {
    return {
        folders: foldersSelector(state),
        cards: cardsSelectors(state)
    }
}

export default connect(mapStateToProps)(FoldersTree)
