import React from "react";

import "./DropdownButton.scss"

function DropdownButton({children, buttonText, isDropdownOpen, onToggleDropdown}) {

    return <div className="dropdown-button">
        <button className="dropdown-button__trigger-button" onClick={onToggleDropdown} >
            {buttonText}
        </button>
        {isDropdownOpen ?
            <div className="dropdown-button__dropdown">
                <ul className="dropdown-button__dropdown-content">
                    {children}
                </ul>
            </div> : null}
    </div>

}

export default React.memo(DropdownButton)