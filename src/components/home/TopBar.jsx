import React, {useState} from "react"


import "./TopBar.scss"

import {IoMdAdd, IoMdClose, IoMdLogOut, IoMdMenu, IoMdSearch} from "react-icons/io"
import {fbAuthentication} from "../../utils/firebase";
import CardModal from "../modal/CardModal";
import {cardSchemaFactory} from "../../utils/schemaFactories";
import cardsFunctions from "../../utils/cardsFunctions";
import {SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import foldersFunctions from "../../utils/foldersFunctions";
import {userLogoutAction} from "../../actions/rootActions";
import store from "../../store/store";
import Button from "../controls/buttons/Button";

function TopBar({onToggleSideBarButtonClick, isSideBarOpened}) {
    const [isCardModalShown, setIsCardModalShown] = useState(false)
    const [newCard, setNewCard] = useState({})


    function handleToggleSideBarButtonClick() {
        onToggleSideBarButtonClick()
    }

    function handleLogoutButtonClick() {
        fbAuthentication.signOut()
        store.dispatch(userLogoutAction())

    }

    function handleAddCardButtonClick() {
        // CANCEL IF THE SELECTED FOLDER IS NOT A USER CREATED FOLDER
        const selectedFolder = foldersFunctions.getSelectedFolder()
        if (SPECIAL_FOLDERS_IDS.includes(selectedFolder.id)) {
            console.warn("You can't create a card in this folder")
            return
        }

        const newCard = cardSchemaFactory("",
            "",
            0,
            foldersFunctions.getSelectedFolder().id)

        setNewCard(newCard)
        cardsFunctions.addCard(newCard)

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
                    <Button onClick={handleToggleSideBarButtonClick} size="Square"
                            Icon={isSideBarOpened ? IoMdClose : IoMdMenu} color="Secondary"/>
                    <div className="top-bar__search">
                        <IoMdSearch className="top-bar__md-search-icon"/>
                        <input type="text" className="top-bar__search-input" placeholder="Search..."/>
                    </div>
                </div>
                <div className="top-bar__right-controls">
                    <Button Icon={IoMdAdd} onClick={handleAddCardButtonClick} color="Secondary" size="Square"/>
                    <Button Icon={IoMdLogOut} onClick={handleLogoutButtonClick} color="Secondary" size="Square"/>
                </div>

            </div>

        </div>
    )
}

export default React.memo(TopBar)