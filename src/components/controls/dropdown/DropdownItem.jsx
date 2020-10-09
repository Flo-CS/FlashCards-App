import React from "react";

import "./DropdownItem.scss"

function DropdownItem({children, value, onItemClick}) {
    function handleItemClick() {
        onItemClick(value)
    }

    return <li className="dropdown-item" onClick={handleItemClick}>
        {children}
    </li>
}

export default React.memo(DropdownItem)