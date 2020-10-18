import PropTypes from "prop-types";
import React, {useState} from "react";
import {IoMdAdd} from "react-icons/io";
import {connect} from "react-redux";
import {addFolderAction} from "../../actions/foldersActions";
import {ENTER_KEY} from "../../constants/keys";
import {folderSchemaFactory} from "../../utils/schemaFactories";

import "./NewFolder.scss";

function NewFolder({addFolder}) {
    const [newFolderName, setNewFolderName] = useState("");

    function handleNewFolderNameInputChange(e) {
        setNewFolderName(e.target.value);
    }

    function handleAddNewFolderButtonClick() {
        const newFolder = folderSchemaFactory(newFolderName);

        addFolder(newFolder);
        setNewFolderName("");
    }

    function handleNewFolderNameInputKeyDown(e) {
        if (e.key === ENTER_KEY) {
            handleAddNewFolderButtonClick();
        }
    }

    return <div className="NewFolder">
        <input className="Input" value={newFolderName} onChange={handleNewFolderNameInputChange}
               onKeyDown={handleNewFolderNameInputKeyDown} placeholder="Enter a folder name"/>
        <button onClick={handleAddNewFolderButtonClick} className="Button Button--Square">{<IoMdAdd
            className="Button__Icon"/>}</button>
    </div>;
}

function mapDispatchToProps(dispatch) {
    return {
        addFolder: (folder) => dispatch(addFolderAction(folder))
    };
}

NewFolder.propTypes = {
    addFolder: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(React.memo(NewFolder));