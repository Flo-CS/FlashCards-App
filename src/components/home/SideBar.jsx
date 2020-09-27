import React, {useEffect, useState} from "react"
import ClassNames from "classnames"

import "./SideBar.scss"
import {firestoreGetUserData} from "../../utils/firestore";
import {connect} from "react-redux";
import {setFoldersAction, setSelectedFolderAction} from "../../actions/foldersActions";
import {foldersSelector} from "../../selectors/foldersSelectors";
import FoldersTreeView from "./FoldersTreeView";
import foldersManager from "../../utils/foldersManager";
import {folderSchemaFactory} from "../../utils/schemaFactories";
import {IoMdAdd} from "react-icons/io";


function SideBar({folders, setFolders, setSelectedFolder, isOpened}) {
    const [newFolderName, setNewFolderName] = useState("")


    useEffect(() => {
        firestoreGetUserData().then((doc) => {
            const data = doc.data()
            const folders = data.folders
            setFolders(folders)
        })
    }, [setFolders])

    function handleNewFolderNameInputChange(e) {
        setNewFolderName(e.target.value)
    }

    function handleAddNewFolderButtonClick() {
        foldersManager.addFolder(folderSchemaFactory(newFolderName, newFolderName.toLowerCase()))
        setNewFolderName("")
    }

    const sideBarClasses = ClassNames({"side-bar": true, "side-bar--opened": isOpened})

    return (<div className={sideBarClasses}>
        <div className="side-bar__inner">
            <div className="side-bar__controls">
                <input className="side-bar__input" value={newFolderName}
                       onChange={handleNewFolderNameInputChange}
                placeholder="Enter a folder name"/>
                <button className="side-bar__button" onClick={handleAddNewFolderButtonClick}>
                    <IoMdAdd className="side-bar__md-add-icon"/>
                </button>
            </div>
            <FoldersTreeView folders={folders} setSelectedFolder={setSelectedFolder}/>
        </div>
    </div>)
}

function mapStateToProps(state) {
    return {
        folders: foldersSelector(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFolders: (folders) => dispatch(setFoldersAction(folders)),
        setSelectedFolder: (folder) => dispatch(setSelectedFolderAction(folder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
