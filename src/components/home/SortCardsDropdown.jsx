import React, {useEffect, useState} from "react";
import cardsFunctions from "../../utils/cardsFunctions";
import Dropdown from "../controls/dropdowns/Dropdown";

function SortCardsDropdown() {
    const [sortingKey, setSortingKey] = useState(null)
    const [reverseSorting, setReverseSorting] = useState(false)


    function handleDropdownItemClick(newSortingKey) {
        if (newSortingKey === sortingKey) {
            setReverseSorting((reverseCardsSorting) => !reverseCardsSorting)
        } else {
            setReverseSorting(false)
        }
        setSortingKey(newSortingKey)

    }

    // Cards sorting
    useEffect(() => {
        cardsFunctions.sortCards(sortingKey, reverseSorting)
    }, [sortingKey, reverseSorting])


    const dropdownOptions = [{
        name: "Date created",
        value: "createdDatetime"
    }, {
        name: "Date viewed",
        value: "lastViewedDatetime"
    }, {
        name: "Front content",
        value: "frontContent"
    }, {
        name: "Back content",
        value: "backContent"
    }]


    return (
        <Dropdown options={dropdownOptions} onItemClick={handleDropdownItemClick} buttonColor="Secondary"
                  buttonSize="Medium">Sort by</Dropdown>
    )
}

export default React.memo(SortCardsDropdown)