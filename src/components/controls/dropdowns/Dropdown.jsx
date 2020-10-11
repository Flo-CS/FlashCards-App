import React, {useRef, useState} from "react";
import ClassNames from "classnames"
import PropTypes from "prop-types"
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import "./Dropdown.scss";
import Button from "../buttons/Button";

function Dropdown({children: buttonText, ButtonIcon, buttonSize, buttonColor, options, position, onItemClick, selectable}) {
    const dropdownRef = useRef()
    useOnClickOutside(dropdownRef, () => setIsListOpen(false))

    const [isListOpen, setIsListOpen] = useState(false)

    function handleToggleList() {
        setIsListOpen((isListOpen) => !isListOpen)
    }

    const [selectedItem, setSelectedItem] = useState(null)

    function handleItemClick(e) {
        setSelectedItem(e.target.dataset.value)
        onItemClick(e.target.dataset.value)

        setIsListOpen(false)
    }

    const dropdownMenuClasses = ClassNames("Dropdown__Menu", `Dropdown__Menu--${position}`)

    return <div className="Dropdown">
        <Button color={buttonColor} size={buttonSize} onClick={handleToggleList}
                Icon={ButtonIcon}>{buttonText}</Button>
        {isListOpen &&
        <div ref={dropdownRef} className={dropdownMenuClasses}>

            <ul className="Dropdown__List">

                {options.map((option) => {
                    const dropdownItemClasses = ClassNames("Dropdown__Item", {"Dropdown__Item--selected": option.value === selectedItem && selectable})

                    return <li data-value={option.value} className={dropdownItemClasses} key={option.name}
                               onClick={handleItemClick}>{option.name}</li>
                })}

            </ul>

        </div>}
    </div>
}


Dropdown.propTypes = {
    children: PropTypes.node,
    options: PropTypes.array.isRequired,
    onItemClick: PropTypes.func,
    position: PropTypes.string,
    ButtonIcon: PropTypes.func,
    buttonColor: PropTypes.string.isRequired,
    buttonSize: PropTypes.string.isRequired,
    selectable: PropTypes.bool,
}
Dropdown.defaultProps = {
    children: "",
    onChange: () => null,
    onItemClick: () => null,
    Icon: () => null,
    position: "Right",
    selectable: true,
}

export default React.memo(Dropdown)