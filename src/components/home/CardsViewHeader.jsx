import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import "./CardsViewHeader.scss"
import {selectedFolderSelector} from "../../selectors/foldersSelectors";
import foldersFunctions from "../../utils/foldersFunctions";
import {SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import SortCardsDropdown from "./SortCardsDropdown";
import Button from "../controls/buttons/Button";
import ControlsGroup from "../controls/group/ControlsGroup";


function CardsViewHeader({selectedFolder}) {

    function handleRemoveFolderButtonClick() {
        foldersFunctions.removeFolder(selectedFolder.id)
    }

    const humanReadableSelectedFolderPath = foldersFunctions.convertFolderPathToHumanReadable(selectedFolder.path)
    const isSelectedFolderSpecialFolder = SPECIAL_FOLDERS_IDS.includes(selectedFolder.id)

    return <div className="CardsViewHeader">
        <div className="CardsViewHeader__Left">
            <p className="CardsViewHeader__FolderPath">{humanReadableSelectedFolderPath}</p>
        </div>
        <div className="CardsViewHeader__Right">
            <ControlsGroup>
                <SortCardsDropdown/>
                <Button color="Danger" size="Medium" onClick={handleRemoveFolderButtonClick}
                        disabled={isSelectedFolderSpecialFolder}>Remove folder</Button>
            </ControlsGroup>
        </div>
    </div>
}

function mapStateTopProps(state) {
    return {
        selectedFolder: selectedFolderSelector(state)
    }
}

CardsViewHeader.propTypes = {
    selectedFolder: PropTypes.object.isRequired,
};


export default connect(mapStateTopProps)(CardsViewHeader)
