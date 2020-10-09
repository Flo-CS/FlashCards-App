import React from "react";

import "./DropdownButton.scss"
import Dropdown from "./Dropdown";

function DropdownButton({children, buttonText, isDropdownOpen, onToggleDropdown}) {

    function handleToggleDropdown() {
        onToggleDropdown()
    }

    return <div className="dropdown-button">
        <button className="dropdown-button__trigger-button" onClick={handleToggleDropdown}>
            {buttonText}
        </button>
        <Dropdown onToggleDropdown={handleToggleDropdown} children={children} isDropdownOpen={isDropdownOpen}/>
    </div>

}

export default React.memo(DropdownButton)