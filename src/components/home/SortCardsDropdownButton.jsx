import DropdownButton from "../controls/dropdown/DropdownButton";
import DropdownItem from "../controls/dropdown/DropdownItem";
import React, {useEffect, useState} from "react";
import cardsFunctions from "../../utils/cardsFunctions";

function SortCardsDropdownButton() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [sortingKey, setSortingKey] = useState(null)
    const [reverseSorting, setReverseSorting] = useState(false)

    function handleDropdownToggle() {
        setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen)
    }

    function handleDropdownItemClick(newSortingKey) {
        if (newSortingKey === sortingKey) {
            setReverseSorting((reverseCardsSorting) => !reverseCardsSorting)
        } else {
            setReverseSorting(false)
        }
        setSortingKey(newSortingKey)

        setIsDropdownOpen(false)
    }

    // Cards sorting
    useEffect(() => {
        cardsFunctions.sortCards(sortingKey, reverseSorting)
    }, [sortingKey, reverseSorting])


    return (
        <DropdownButton buttonText="Sort by" isDropdownOpen={isDropdownOpen} onToggleDropdown={handleDropdownToggle}>
            <DropdownItem value="createdDatetime"
                          onItemClick={handleDropdownItemClick}
                          selected={sortingKey === "createdDatetime"}>Date created</DropdownItem>
            <DropdownItem value="lastViewedDatetime"
                          onItemClick={handleDropdownItemClick}
                          selected={sortingKey === "lastViewedDatetime"}>Date viewed</DropdownItem>
            <DropdownItem value="frontContent"
                          onItemClick={handleDropdownItemClick}
                          selected={sortingKey === "frontContent"}>Front
                content</DropdownItem>
            <DropdownItem value="backContent"
                          onItemClick={handleDropdownItemClick}
                          selected={sortingKey === "backContent"}>Back content</DropdownItem>
        </DropdownButton>)
}

export default React.memo(SortCardsDropdownButton)