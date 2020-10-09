import React, {useState} from "react"
import DropdownItem from "../../controls/dropdown/DropdownItem";
import DropdownButton from "../../controls/dropdown/DropdownButton";
import {IoMdMore} from "react-icons/io";

import "./CardDropdownButton.scss"
import MoveToAnotherFolderModal from "../../modal/MoveToAnotherFolderModal";

function CardDropdownButton({cardId}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isMoveToAnotherFolderModalOpen, setIsMoveToAnotherModalOpen] = useState(false)


    function handleDropdownToggle() {
        setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen)
    }

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
        setIsDropdownOpen(false)
    }

    return (
        <div className="card-dropdown-button">
            <DropdownButton buttonText={<IoMdMore className="card-dropdown-button__md-more-icon"/>}
                            isDropdownOpen={isDropdownOpen}
                            onToggleDropdown={handleDropdownToggle}>
                <DropdownItem value="moveToAnotherFolder" onItemClick={handleDropdownItemClick}>Move to another
                    folder</DropdownItem>
            </DropdownButton>
            {isMoveToAnotherFolderModalOpen && <MoveToAnotherFolderModal initialCardId={cardId}/>}
        </div>)
}

export default React.memo(CardDropdownButton)