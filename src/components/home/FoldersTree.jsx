import React, {useEffect, useState} from "react";
import PropTypes from "prop-types"
import Tree from "rc-tree";

import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"

import "./FoldersTree.scss"
import {ALL_FOLDER_ID, SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import {countCards} from "../../utils/cardsFunctions";
import {foldersSelector, selectedFolderSelector} from "../../selectors/foldersSelectors";
import {connect} from "react-redux";
import {cardsSelectors} from "../../selectors/cardsSelectors";
import {getFolderById, getFolderSubFolders} from "../../utils/foldersFunctions";
import {moveFolderAction, setSelectedFolderAction} from "../../actions/foldersActions";


function convertFoldersToTreeData(folders, cards, depth = 1) {

    return (
        folders
            .filter((folder) => {
                // We return only folders where the folder depth is equal to the current function depth
                return (folder.path.split("/").length === depth)
            })
            .map((folder) => {
                // We return a folder tree node and if the current folder has subFolders we call the functions again (recurrence) to get the subFolders tree node ("children tree node property")

                // We get current folder subFolders
                const folderSubFolders = getFolderSubFolders(folders, folder)

                // We increase the depth
                let newDepth = depth + 1
                // And we retrieve tree node children of the current folder subFolders
                const children = convertFoldersToTreeData(folderSubFolders, cards, newDepth)

                return {
                    key: folder.id,
                    title: `${folder.name} - ${countCards(cards, folder.id)}`,
                    children: children
                }
            })
    )
}


function FoldersTree({folders, cards, selectedFolder, setSelectedFolder, moveFolder}) {
    const [treeData, setTreeData] = useState(null)
    // We need to change the tree data also when cards are changed because we count how much cards there is in each folder
    useEffect(() => {
        setTreeData(convertFoldersToTreeData(folders, cards))
    }, [folders, cards])

    // We can use selectedFolder.id to initialize the state because we set a default value for it
    const [treeSelectedKeys, setTreeSelectedKeys] = useState([selectedFolder.id])

    function handleTreeNodeSelect(selectedKeys) {
        //Check that there is one selectedKeys otherwise the selectedFolder will be undefined and it must not be undefined
        if (selectedKeys.length !== 0) {
            const selectedFolder = getFolderById(folders, selectedKeys[0])
            setSelectedFolder(selectedFolder)
        } else {
            const allFolder = getFolderById(folders, ALL_FOLDER_ID)
            setSelectedFolder(allFolder)
        }
    }

    // Each time selected folder change, also change the selected key, this is done like this because the selected folder can be changed elsewhere in the app
    useEffect(() => {
        setTreeSelectedKeys([selectedFolder.id])
    }, [selectedFolder])

    function handleTreeNodeDrop(info) {
        const dropNode = info.node;
        const dragNode = info.dragNode;

        const dropFolder = getFolderById(folders, dropNode.key)
        const dragFolder = getFolderById(folders, dragNode.key)

        const splitDropNodePos = dropNode.pos.split("-")
        const isDropToRoot = !dropNode.dragOver && splitDropNodePos.length === 2 && splitDropNodePos[0] === "0"

        if (SPECIAL_FOLDERS_IDS.includes(dragFolder.id)) {
            console.warn("You can't move this folder")
        } else if (SPECIAL_FOLDERS_IDS.includes(dropFolder.id) && !isDropToRoot) {
            console.warn("You can't move other folder to this folder")
        } else if (isDropToRoot) {
            moveFolder(dragFolder, null)
        } else {
            moveFolder(dragFolder, dropFolder)
        }
    }

    return <div>
        <Tree treeData={treeData}
              onSelect={handleTreeNodeSelect}
              prefixCls="FoldersTree"
              onDrop={handleTreeNodeDrop}
              draggable
              switcherIcon={(props) => {
                  if (props.isLeaf) return null
                  return props.expanded ? <IoIosArrowUp className="FoldersTree__ArrowUpIcon"/> :
                      <IoIosArrowDown className="FoldersTree__ArrowDownIcon"/>
              }}
              selectedKeys={treeSelectedKeys}
        />
    </div>
}

function mapStateToProps(state) {
    return {
        folders: foldersSelector(state),
        cards: cardsSelectors(state),
        selectedFolder: selectedFolderSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedFolder: (folder) => dispatch(setSelectedFolderAction(folder)),
        moveFolder: (movedFolder, destinationFolder) => dispatch(moveFolderAction(movedFolder, destinationFolder))
    }
}

FoldersTree.propTypes = {
    folders: PropTypes.array.isRequired,
    cards: PropTypes.array.isRequired,
    selectedFolder: PropTypes.object.isRequired,
    setSelectedFolder: PropTypes.func.isRequired,
    moveFolder: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FoldersTree))
