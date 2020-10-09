import React, {useRef} from "react";

import "./Dropdown.scss"
import useOnClickOutside from "../../../hooks/useOnClickOutside";

function Dropdown({children, isDropdownOpen, onToggleDropdown}) {
    const dropdownRef = useRef()
    useOnClickOutside(dropdownRef, () => handleToggleDropdown())

    function handleToggleDropdown() {
        onToggleDropdown()
    }

    if (!isDropdownOpen) return null

    return <div className="dropdown" ref={dropdownRef}>
        <ul className="dropdown-content">
            {children}
        </ul>
    </div>

}

export default React.memo(Dropdown)