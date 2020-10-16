import React, {useState} from "react"
import {IoMdAdd} from "react-icons/io";
import foldersFunctions from "../../utils/foldersFunctions";
import {folderSchemaFactory} from "../../utils/schemaFactories";
import {ENTER_KEY} from "../../constants/keys";

import "./NewFolder.scss"

function NewFolder() {
    const [newFolderName, setNewFolderName] = useState("")

    function handleNewFolderNameInputChange(e) {
        setNewFolderName(e.target.value)
    }

    const handleAddNewFolderButtonClick = () => {
        const newFolder = folderSchemaFactory(newFolderName)
        foldersFunctions.addFolder(newFolder)
        setNewFolderName("")
    };

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


export default React.memo(NewFolder)