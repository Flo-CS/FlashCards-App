import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import "./CardsViewHeader.scss"
import {foldersSelector, selectedFolderSelector} from "../../selectors/foldersSelectors";
import {SPECIAL_FOLDERS_IDS, TRASH_FOLDER, TRASH_FOLDER_ID} from "../../constants/folders";
import SortCardsDropdown from "./SortCardsDropdown";
import ControlsGroup from "../controls/group/ControlsGroup";
import {removeFolderAction, setSelectedFolderAction} from "../../actions/foldersActions";
import {convertFolderPathToHumanReadable} from "../../utils/foldersFunctions";
import {moveCardsAction} from "../../actions/cardsActions";


function CardsViewHeader({selectedFolder, folders, removeFolder, setSelectedFolder, moveCards}) {

    function handleRemoveFolderButtonClick() {
        // Interdiction to remove the special folders
        if (SPECIAL_FOLDERS_IDS.includes(selectedFolder.id)) return

        // Move the cards of the deleted folder to the trash
        moveCards(selectedFolder.id, TRASH_FOLDER_ID)
        setSelectedFolder(TRASH_FOLDER)

        removeFolder(selectedFolder.id)
    }


    const humanReadableSelectedFolderPath = convertFolderPathToHumanReadable(folders, selectedFolder.path)
    const isSelectedFolderSpecialFolder = SPECIAL_FOLDERS_IDS.includes(selectedFolder.id)

    return <div className="CardsViewHeader">
        <div className="CardsViewHeader__Left">
            <p className="CardsViewHeader__FolderPath">{humanReadableSelectedFolderPath}</p>
        </div>
        <div className="CardsViewHeader__Right">
            <ControlsGroup>
                <SortCardsDropdown/>
                <button className="Button Button--Danger" onClick={handleRemoveFolderButtonClick}
                        disabled={isSelectedFolderSpecialFolder}>Remove folder
                </button>
            </ControlsGroup>
        </div>
    </div>
}

function mapStateTopProps(state) {
    return {
        selectedFolder: selectedFolderSelector(state),
        folders: foldersSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeFolder: (folderId) => dispatch(removeFolderAction(folderId)),
        setSelectedFolder: (folder) => dispatch(setSelectedFolderAction(folder)),
        moveCards: (sourceFolderId, destinationFolderId) => dispatch(moveCardsAction(sourceFolderId, destinationFolderId))
    }
}

CardsViewHeader.propTypes = {
    selectedFolder: PropTypes.object.isRequired,
    folders: PropTypes.array.isRequired,
    removeFolder: PropTypes.func.isRequired,
    setSelectedFolder: PropTypes.func.isRequired,
    moveCards: PropTypes.func.isRequired,
};


export default connect(mapStateTopProps, mapDispatchToProps)(React.memo(CardsViewHeader))
