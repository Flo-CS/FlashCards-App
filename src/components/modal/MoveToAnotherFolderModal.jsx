import Modal from "./Modal";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {foldersSelector} from "../../selectors/foldersSelectors";
import cardsFunctions from "../../utils/cardsFunctions";


function MoveToAnotherFolderModal({initialCardId, onModalClose, folders}) {
    const [currentCard, setCurrentCard] = useState({})
    const [selectedDestinationFolderId, setSelectedDestinationFolderId] = useState(null)

    useEffect(() => {
        setCurrentCard(cardsFunctions.getCard(currentCard.id || initialCardId))
    }, [currentCard.id, initialCardId])

    function handleModalClose() {
        onModalClose()
    }

    function handleValidateButton() {
        cardsFunctions.moveCard(currentCard.id, selectedDestinationFolderId)
    }

    function handleSelectChange(e) {
        setSelectedDestinationFolderId(e.target.value)
    }

    return (<Modal onModalClose={handleModalClose}>
            <div className="move-to-another-folder-modal">
                <select onChange={handleSelectChange}>
                    {folders.map((folder) => {
                        return <option key={folder.id} value={folder.id}>{folder.name}</option>
                    })}
                </select>
                <button className="move-to-another-folder-modal__button" onClick={handleValidateButton}>
                    Validate
                </button>
            </div>
        </Modal>
    )
}

function mapStateToProps(state) {
    return {
        folders: foldersSelector(state)
    }
}

export default connect(mapStateToProps)(MoveToAnotherFolderModal)
