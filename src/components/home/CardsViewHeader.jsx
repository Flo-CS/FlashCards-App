import React from "react"
import {connect} from "react-redux"

import "./CardsViewHeader.scss"
import {selectedFolderSelector} from "../../selectors/foldersSelectors";
import foldersManager from "../../utils/foldersFunctions";
import {SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import cardsManager from "../../utils/cardsFunctions";


function CardsViewHeader({selectedFolder}) {

    function handleRemoveFolderButtonClick() {
        if (SPECIAL_FOLDERS_IDS.includes(selectedFolder.id)) {
            console.warn("You can't delete this folder")
            return
        }
        const parentFolder = foldersManager.getParentFolder(selectedFolder)

        if (parentFolder) {
            cardsManager.moveCards(selectedFolder.id, parentFolder.id)
        } else {
            cardsManager.removeCardsByFolderId(selectedFolder.id)
        }

        foldersManager.removeFolder(selectedFolder.id)
    }

    const humanReadableSelectedFolderPath = foldersManager.convertFolderPathToHumanReadable(selectedFolder.path)

    return <div className="cards-view-header">
        <div className="cards-view-header__left">
            <p className="cards-view-header__folder-path">{humanReadableSelectedFolderPath}</p>
        </div>
        <div className="cards-view-header__right">
            <button className="cards-view-header__button" onClick={handleRemoveFolderButtonClick}>Remove Folder</button>

        </div>
    </div>
}

function mapStateTopProps(state) {
    return {
        selectedFolder: selectedFolderSelector(state)
    }
}

export default connect(mapStateTopProps)(CardsViewHeader)
