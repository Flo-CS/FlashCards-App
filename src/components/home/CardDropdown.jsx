import PropTypes from "prop-types";
import React, {useState} from "react";
import {IoMdMore} from "react-icons/io";
import Dropdown from "../controls/dropdown/Dropdown";
import MoveToAnotherFolderModal from "../modal/MoveToAnotherFolderModal";


function CardDropdown({cardId}) {
    const [isMoveToAnotherFolderModalOpen, setIsMoveToAnotherModalOpen] = useState(false);

    function handleDropdownItemClick(action) {
        switch (action) {
            case "moveToAnotherFolder": {
                setIsMoveToAnotherModalOpen(true);
                break;
            }
            default: {
                break;
            }
        }
    }

    function handleMoveToAnotherFolderModalClose() {
        setIsMoveToAnotherModalOpen(false);
    }

    const dropdownOptions = [{name: "Move to another folder", value: "moveToAnotherFolder"}];

    return <>
        <Dropdown options={dropdownOptions}
                  onItemClick={handleDropdownItemClick}
                  ButtonIcon={<IoMdMore className="Button__Icon"/>}
                  buttonClassName="Button Button--Square"
                  selectable={false}/>

        {isMoveToAnotherFolderModalOpen &&
        <MoveToAnotherFolderModal initialCardId={cardId} onModalClose={handleMoveToAnotherFolderModalClose}/>}
    </>;
}

CardDropdown.propTypes = {
    cardId: PropTypes.string.isRequired,
};


export default React.memo(CardDropdown);