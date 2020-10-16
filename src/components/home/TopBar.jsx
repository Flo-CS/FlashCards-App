import React, {useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import "./TopBar.scss"

import {IoMdAdd, IoMdClose, IoMdLogOut, IoMdMenu, IoMdSearch} from "react-icons/io"
import {fbAuthentication} from "../../utils/firebase";
import CardModal from "../modal/cardModal/CardModal";
import {cardSchemaFactory} from "../../utils/schemaFactories";
import cardsFunctions from "../../utils/cardsFunctions";
import {SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import foldersFunctions from "../../utils/foldersFunctions";
import {userLogoutAction} from "../../actions/rootActions";
import ControlsGroup from "../controls/group/ControlsGroup";

function TopBar({onToggleSideBarButtonClick, isSideBarOpened, userLogout}) {
    const [isCardModalShown, setIsCardModalShown] = useState(false)
    const [newCard, setNewCard] = useState({})

    function handleToggleSideBarButtonClick() {
        onToggleSideBarButtonClick()
    }

    function handleLogoutButtonClick() {
        fbAuthentication.signOut()
        userLogout()
    }

    function handleAddCardButtonClick() {
        // TODO : Move this in cardFunctions.addCard (for the moment it's not primordial)
        // Cancel if the selected folder is not a folder created by user (a special folder)
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
        <div className="TopBar">
            {isCardModalShown ? <CardModal initialCardId={newCard.id} onModalClose={handleModalClose}/> : null}
            <div className="TopBar__Inner">
                <div className="TopBar__LeftControls">
                    <ControlsGroup>
                        <button className="Button Button--Square" onClick={handleToggleSideBarButtonClick}>
                            {isSideBarOpened ? <IoMdClose className="Button__Icon"/> :
                                <IoMdMenu className="Button__Icon"/>}

                        </button>

                        <div className="TopBar__Search">
                            <IoMdSearch className="TopBar__SearchIcon"/>
                            <input type="text" className="TopBar__SearchInput" placeholder="Search..."/>
                        </div>
                    </ControlsGroup>
                </div>
                <div className="TopBar__RightControls">
                    <ControlsGroup>
                        <button className="Button Button--Square" onClick={handleAddCardButtonClick}><IoMdAdd
                            className="Button__Icon"/></button>
                        <button className="Button Button--Square" onClick={handleLogoutButtonClick}><IoMdLogOut
                            className="Button__Icon"/></button>
                    </ControlsGroup>

                </div>
            </div>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(userLogoutAction())
    }
}

TopBar.propTypes = {
    onToggleSideBarButtonClick: PropTypes.func.isRequired,
    isSideBarOpened: PropTypes.bool.isRequired,
    userLogout: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(TopBar)