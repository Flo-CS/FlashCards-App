import React, {useRef} from "react";

import "./DropdownButton.scss"
import useOnClickOutside from "../../../hooks/useOnClickOutside";

function DropdownButton({children, buttonText, isDropdownOpen, onToggleDropdown}) {
    const dropdownRef = useRef()
    useOnClickOutside(dropdownRef, () => handleToggleDropdown())

    function handleToggleDropdown(){
        onToggleDropdown()
    }

    return <div className="dropdown-button" >
        <button className="dropdown-button__trigger-button" onClick={handleToggleDropdown} >
            {buttonText}
        </button>
        {isDropdownOpen ?
            <div className="dropdown-button__dropdown" ref={dropdownRef}>
                <ul className="dropdown-button__dropdown-content" >
                    {children}
                </ul>
            </div> : null}
    </div>

}

export default React.memo(DropdownButton)