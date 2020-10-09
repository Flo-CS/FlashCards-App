import React from "react";
import ClassNames from "classnames"


import "./DropdownItem.scss"

function DropdownItem({children, value, onItemClick, selected}) {
    function handleItemClick() {
        onItemClick(value)
    }

    const dropdownItemClasses = ClassNames({"dropdown-item": true, "dropdown-item--selected": selected})
    return <li className={dropdownItemClasses} onClick={handleItemClick}>
        {children}
    </li>
}

export default React.memo(DropdownItem)