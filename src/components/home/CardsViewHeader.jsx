import React from "react"
import {connect} from "react-redux"

import "./CardsViewHeader.scss"
import {selectedFolderSelector} from "../../selectors/foldersSelectors";
import foldersFunctions from "../../utils/foldersFunctions";
import {SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import cardsFunctions from "../../utils/cardsFunctions";
import SortCardsDropdownButton from "./SortCardsDropdownButton";


function CardsViewHeader({selectedFolder}) {


    function handleRemoveFolderButtonClick() {
        if (SPECIAL_FOLDERS_IDS.includes(selectedFolder.id)) {
            console.warn("You can't delete this folder")
            return
        }
        const parentFolder = foldersFunctions.getParentFolder(selectedFolder)

        if (parentFolder) {
            cardsFunctions.moveCards(selectedFolder.id, parentFolder.id)
        } else {
            // If there is no parent (the folder is in the root), we delete the cards
            cardsFunctions.removeCardsByFolderId(selectedFolder.id)
        }

        foldersFunctions.removeFolder(selectedFolder.id)
    }


    const humanReadableSelectedFolderPath = foldersFunctions.convertFolderPathToHumanReadable(selectedFolder.path)

    return <div className="cards-view-header">
        <div className="cards-view-header__left">
            <p className="cards-view-header__folder-path">{humanReadableSelectedFolderPath}</p>
        </div>
        <div className="cards-view-header__right">
            <SortCardsDropdownButton/>
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
