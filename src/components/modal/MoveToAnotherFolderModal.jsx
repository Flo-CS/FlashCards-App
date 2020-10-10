import Modal from "./Modal";
import PropTypes from "prop-types"
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {foldersSelector} from "../../selectors/foldersSelectors";
import cardsFunctions from "../../utils/cardsFunctions";
import Button from "../controls/buttons/Button";

import "./MoveToAnotherFolderModal.scss"
import Dropdown from "../controls/dropdowns/Dropdown";
import {ALL_FOLDER_ID} from "../../constants/folders";


function MoveToAnotherFolderModal({initialCardId, onModalClose, folders}) {
    const [currentCard, setCurrentCard] = useState({})
    const [selectedDestinationFolderId, setSelectedDestinationFolderId] = useState(null)

    useEffect(() => {
        setCurrentCard(cardsFunctions.getCard(initialCardId))
    }, [initialCardId])

    function handleModalClose() {
        onModalClose()
    }

    function handleValidateButton() {
        cardsFunctions.moveCard(currentCard.id, selectedDestinationFolderId)
        handleModalClose()
    }

    function handleDropdownChange(folderId) {
        setSelectedDestinationFolderId(folderId)
    }

    const dropdownOptions = folders.filter(folder => {
        return folder.id !== ALL_FOLDER_ID
    }).map((folder) => {
        return {name: folder.name, value: folder.id}
    })

    return (<Modal onModalClose={handleModalClose}>
            <div className="MoveToAnotherFolderModal">
                <Dropdown options={dropdownOptions} defaultSelected={currentCard.folderId}
                          onItemClick={handleDropdownChange} buttonColor="Primary" buttonSize="Expand">Select a
                    destination folder</Dropdown>
                <Button onClick={handleValidateButton} color="Primary" size="Medium">Validate</Button>

            </div>
        </Modal>
    )
}

function mapStateToProps(state) {
    return {
        folders: foldersSelector(state)
    }
}

MoveToAnotherFolderModal.propTypes = {
    initialCardId: PropTypes.string.isRequired,
    onModalClose: PropTypes.func.isRequired,
    folders: PropTypes.array.isRequired,
};


export default connect(mapStateToProps)(MoveToAnotherFolderModal)
