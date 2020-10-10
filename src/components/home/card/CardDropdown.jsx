import React, {useState} from "react"
import PropTypes from "prop-types"
import MoveToAnotherFolderModal from "../../modal/MoveToAnotherFolderModal";
import Dropdown from "../../controls/dropdowns/Dropdown";
import {IoMdMore} from "react-icons/io";


function CardDropdown({cardId}) {
    const [isMoveToAnotherFolderModalOpen, setIsMoveToAnotherModalOpen] = useState(false)

    function handleDropdownItemClick(action) {
        switch (action) {
            case "moveToAnotherFolder": {
                setIsMoveToAnotherModalOpen(true)
                break
            }
            default: {
                break
            }
        }
    }

    const dropdownOptions = [{name: "Move to another folder", value: "moveToAnotherFolder"}]

    return <>
        <Dropdown options={dropdownOptions}
                  onItemClick={handleDropdownItemClick}
                  ButtonIcon={IoMdMore}
                  buttonColor="Secondary"
                  buttonSize="Square"/>

        {isMoveToAnotherFolderModalOpen && <MoveToAnotherFolderModal initialCardId={cardId}/>}
    </>
}

CardDropdown.propTypes = {
    cardId: PropTypes.string.isRequired,
};


export default React.memo(CardDropdown)