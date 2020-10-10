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
                console.log("Action doesn't exist")
                break
            }
        }
    }

    return <>
        <Dropdown options={[{name: "Move to another folder", value: "moveToAnotherFolder"}]}
                  onItemClick={handleDropdownItemClick} ButtonIcon={IoMdMore} buttonSize="Square"/>
        {isMoveToAnotherFolderModalOpen && <MoveToAnotherFolderModal initialCardId={cardId}/>}
    </>
}

export default React.memo(CardDropdownButton)