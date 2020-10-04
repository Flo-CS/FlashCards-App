import DropdownButton from "../controls/dropdown/DropdownButton";
import DropdownItem from "../controls/dropdown/DropdownItem";
import React, {useEffect, useState} from "react";
import cardsFunctions from "../../utils/cardsFunctions";

export default function SortCardsDropdownButton() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [cardsSortingKey, setCardsSortingKey] = useState(null)
    const [reverseCardsSorting, setReverseCardsSorting] = useState(false)

    function handleDropdownToggle() {
        setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen)
    }

    function handleDropdownItemClick(sortingKey) {
        if (sortingKey === cardsSortingKey) {
            setReverseCardsSorting((reverseCardsSorting) => !reverseCardsSorting)
        } else {
            setReverseCardsSorting(false)
        }
        setCardsSortingKey(sortingKey)

        setIsDropdownOpen(false)
    }

    // Cards sorting
    useEffect(() => {
        cardsFunctions.sortCards(cardsSortingKey, reverseCardsSorting)
    }, [cardsSortingKey, reverseCardsSorting])


    return (
        <DropdownButton buttonText="Sort by" isDropdownOpen={isDropdownOpen} onToggleDropdown={handleDropdownToggle}>
            <DropdownItem value="createdDatetime"
                          onItemClick={handleDropdownItemClick}>Date created</DropdownItem>
            <DropdownItem value="lastViewedDatetime"
                          onItemClick={handleDropdownItemClick}>Date viewed</DropdownItem>
            <DropdownItem value="frontContent"
                          onItemClick={handleDropdownItemClick}>Front
                content</DropdownItem>
            <DropdownItem value="backContent"
                          onItemClick={handleDropdownItemClick}>Back content</DropdownItem>
        </DropdownButton>)
}