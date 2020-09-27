import React, {useEffect} from "react"
import ClassNames from "classnames"

import "./SideBar.scss"
import {firestoreGetUserData} from "../../utils/firestore";
import {connect} from "react-redux";
import {setFoldersAction, setSelectedFolderAction} from "../../actions/foldersActions";
import {foldersSelector} from "../../selectors/foldersSelectors";
import FoldersTreeView from "./FoldersTreeView";


function SideBar({folders, setFolders, setSelectedFolder, isOpened}) {

    useEffect(() => {
        firestoreGetUserData().then((doc) => {
            const data = doc.data()
            const folders = data.folders
            setFolders(folders)
        })
    }, [setFolders])

    const sideBarClasses = ClassNames({"side-bar": true, "side-bar--opened": isOpened})

    return (<div className={sideBarClasses}>
        <div className="side-bar__inner">
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
