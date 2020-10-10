import React, {useState} from "react"

import MoveToAnotherFolderModal from "../../modal/MoveToAnotherFolderModal";
import Dropdown from "../../controls/dropdowns/Dropdown";
import {IoMdMore} from "react-icons/io";


function CardDropdownButton({cardId}) {
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

export default React.memo(CardDropdownButton)