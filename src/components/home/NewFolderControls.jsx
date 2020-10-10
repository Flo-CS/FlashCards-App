import React, {useState} from "react"
import Input from "../controls/inputs/Input";
import Button from "../controls/buttons/Button";
import {IoMdAdd} from "react-icons/io";
import foldersFunctions from "../../utils/foldersFunctions";
import {folderSchemaFactory} from "../../utils/schemaFactories";
import {ENTER_KEY} from "../../constants/keys";
import ControlsGroup from "../controls/group/ControlsGroup";

import "./NewFolderControls.scss"

function NewFolderControls() {
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

    return <div className="NewFolderControls">
        <ControlsGroup>
            <Input value={newFolderName} onChange={handleNewFolderNameInputChange}
                   onKeyDown={handleNewFolderNameInputKeyDown} placeholder="Enter a folder name"/>
            <Button onClick={handleAddNewFolderButtonClick} Icon={IoMdAdd} color="Secondary" size="Square"/>
        </ControlsGroup>
    </div>
}


export default React.memo(NewFolderControls)