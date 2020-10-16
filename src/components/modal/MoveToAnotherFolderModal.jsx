import Modal from "./Modal";
import PropTypes from "prop-types"
import React, {useMemo, useState} from "react";
import {connect} from "react-redux";
import {foldersSelector} from "../../selectors/foldersSelectors";
import cardsFunctions from "../../utils/cardsFunctions";


import "./MoveToAnotherFolderModal.scss"
import Dropdown from "../controls/dropdown/Dropdown";
import {ALL_FOLDER_ID} from "../../constants/folders";


function MoveToAnotherFolderModal({initialCardId, onModalClose, folders}) {
    const currentCard = useMemo(() => {
        return cardsFunctions.getCard(initialCardId)
    }, [initialCardId])

    const [selectedDestinationFolderId, setSelectedDestinationFolderId] = useState(currentCard.folderId)

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
                <Dropdown options={dropdownOptions} onItemClick={handleDropdownChange}
                          buttonText="Select a destination folder"
                          buttonClassName="Button"/>
                <button onClick={handleValidateButton} className="Button Button--Accent">Validate</button>

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
