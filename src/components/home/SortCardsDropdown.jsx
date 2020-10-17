import React, {useEffect, useState} from "react";
import PropTypes from "prop-types"
import Dropdown from "../controls/dropdown/Dropdown";
import {CARDS_SORT_OPTIONS} from "../../constants/cards";
import {connect} from "react-redux"
import {setCardsSortingKeyAction, setIsCardsSortingReversedAction} from "../../actions/cardsActions";
import {cardsSortingKeySelector, isCardsSortingReversedSelector} from "../../selectors/cardsSelectors";

function SortCardsDropdown({cardsSortingKey, isCardsSortingReversed, setCardsSortingKey, setIsCardsSortingReversed}) {
    const [sortingKey, setSortingKey] = useState(cardsSortingKey)
    const [reverseSorting, setReverseSorting] = useState(isCardsSortingReversed)


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
        setCardsSortingKey(sortingKey)
    }, [sortingKey, setCardsSortingKey])
    useEffect(() => {
        setIsCardsSortingReversed(reverseSorting)
    }, [reverseSorting, setIsCardsSortingReversed])

    return (
        <Dropdown options={CARDS_SORT_OPTIONS} onItemClick={handleDropdownItemClick} buttonText="Sort by"
                  buttonClassName="Button" defaultSelectedItem={cardsSortingKey}
        >Sort by</Dropdown>
    )
}


function mapStateToProps(state) {
    return {
        cardsSortingKey: cardsSortingKeySelector(state),
        isCardsSortingReversed: isCardsSortingReversedSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCardsSortingKey: (key) => dispatch(setCardsSortingKeyAction(key)),
        setIsCardsSortingReversed: (value) => dispatch(setIsCardsSortingReversedAction(value))
    }
}


SortCardsDropdown.propTypes = {
    cardsSortingKey: PropTypes.string.isRequired,
    isCardsSortingReversed: PropTypes.bool.isRequired,
    setCardsSortingKey: PropTypes.func.isRequired,
    setIsCardsSortingReversed: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SortCardsDropdown))