import React, {useState} from "react"

import "./TopBar.scss"

import {IoMdAdd, IoMdClose, IoMdLogOut, IoMdMenu, IoMdSearch} from "react-icons/io"
import {fbAuthentication} from "../../utils/firebase";
import CardModal from "../modal/CardModal";
import {cardSchemaFactory} from "../../utils/schemaFactories";
import cardsManager from "../../utils/cards";
import {ALL_FOLDER_ID} from "../../constants/folders";
import foldersManager from "../../utils/folders";

function TopBar({onToggleSideBarButtonClick, isSideBarOpened}) {
    const [isCardModalShown, setIsCardModalShown] = useState(false)
    const [newCard, setNewCard] = useState({})


    function handleToggleSideBarButtonClick() {
        onToggleSideBarButtonClick()
    }

    function handleLogoutButtonClick() {
        fbAuthentication.signOut()
    }

    function handleAddCardButtonClick() {
        const newCard = cardSchemaFactory("",
            "",
            0,
            foldersManager.getSelectedFolder() ? foldersManager.getSelectedFolder().id : ALL_FOLDER_ID)

        setNewCard(newCard)
        cardsManager.addCard(newCard)

        setIsCardModalShown(true)

    }

    function handleModalClose() {
        setIsCardModalShown(false)
    }


    return (
        <div className="top-bar">
            {isCardModalShown ? <CardModal initialCardId={newCard.id} onModalClose={handleModalClose}/> : null}
            <div className="top-bar__inner">
                <div className="top-bar__left-controls">
                    <button className="top-bar__button top-bar__left-side-bar-toggle"
                            onClick={handleToggleSideBarButtonClick}>
                        {isSideBarOpened ? <IoMdClose className="top-bar__md-close-icon"/> :
                            <IoMdMenu className="top-bar__md-menu-icon"/>}
                    </button>
                    <div className="top-bar__search">
                        <IoMdSearch className="top-bar__md-search-icon"/>
                        <input type="text" className="top-bar__search-input" placeholder="Search..."/>
                    </div>
                </div>
                <div className="top-bar__right-controls">
                    <button className="top-bar__button" onClick={handleAddCardButtonClick}>
                        <IoMdAdd className="top-bar__md-add-icon"/>
                    </button>
                    <button className="top-bar__button" onClick={handleLogoutButtonClick}>
                        <IoMdLogOut className="top-bar__md-logout-icon"/>
                    </button>
                </div>

            </div>

        </div>
    )
}

export default React.memo(TopBar)