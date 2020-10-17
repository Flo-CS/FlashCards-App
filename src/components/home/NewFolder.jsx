import React, {useState} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {IoMdAdd} from "react-icons/io";
import {folderSchemaFactory} from "../../utils/schemaFactories";
import {ENTER_KEY} from "../../constants/keys";

import "./NewFolder.scss"
import {addFolderAction} from "../../actions/foldersActions";

function NewFolder({addFolder}) {
    const [newFolderName, setNewFolderName] = useState("")

    function handleNewFolderNameInputChange(e) {
        setNewFolderName(e.target.value)
    }

    function handleAddNewFolderButtonClick() {
        const newFolder = folderSchemaFactory(newFolderName)

        addFolder(newFolder)
        setNewFolderName("")
    }

    function handleNewFolderNameInputKeyDown(e) {
        if (e.key === ENTER_KEY) {
            handleAddNewFolderButtonClick()
        }
    }

    return <div className="NewFolder">
        <input className="Input" value={newFolderName} onChange={handleNewFolderNameInputChange}
               onKeyDown={handleNewFolderNameInputKeyDown} placeholder="Enter a folder name"/>
        <button onClick={handleAddNewFolderButtonClick} className="Button Button--Square">{<IoMdAdd
            className="Button__Icon"/>}</button>
    </div>
}

function mapDispatchToProps(dispatch) {
    return {
        addFolder: (folder) => dispatch(addFolderAction(folder))
    }
}

NewFolder.propTypes = {
    addFolder: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(React.memo(NewFolder))