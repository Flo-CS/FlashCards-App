import React, {useEffect, useState} from "react"
import ClassNames from "classnames"

import "./SideBar.scss"
import {firestoreGetUserData} from "../../utils/firestore";
import {connect} from "react-redux";
import {setFoldersAction} from "../../actions/foldersActions";
import {foldersSelector} from "../../selectors/foldersSelectors";
import FoldersTreeView from "./FoldersTree";
import foldersFunctions from "../../utils/foldersFunctions";
import {folderSchemaFactory} from "../../utils/schemaFactories";
import {IoMdAdd} from "react-icons/io";
import {ENTER} from "../../constants/keys";


function SideBar({folders, setFolders, isOpened}) {
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
        foldersFunctions.addFolder(folderSchemaFactory(newFolderName, newFolderName.toLowerCase()))
        setNewFolderName("")
    }

    function handleNewFolderNameInputKeyDown(e) {
        if (e.key === ENTER) {
            handleAddNewFolderButtonClick()
        }
    }

    const sideBarClasses = ClassNames({"side-bar": true, "side-bar--opened": isOpened})


    return (<div className={sideBarClasses}>
        <div className="side-bar__inner">
            <div className="side-bar__controls">
                <input className="side-bar__input" value={newFolderName}
                       onChange={handleNewFolderNameInputChange}
                       placeholder="Enter a folder name"
                       onKeyDown={handleNewFolderNameInputKeyDown}/>
                <button className="side-bar__button" onClick={handleAddNewFolderButtonClick}>
                    <IoMdAdd className="side-bar__md-add-icon"/>
                </button>
            </div>
            <FoldersTreeView folders={folders}/>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
