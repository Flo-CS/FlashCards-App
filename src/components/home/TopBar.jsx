import PropTypes from "prop-types";
import React, {useState} from "react";

import {IoMdAdd, IoMdClose, IoMdLogOut, IoMdMenu, IoMdSave, IoMdSearch} from "react-icons/io";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {addCardAction} from "../../actions/cardsActions";
import {userLogoutAction} from "../../actions/rootActions";
import {SPECIAL_FOLDERS_IDS} from "../../constants/folders";
import {selectedFolderSelector} from "../../selectors/foldersSelectors";
import {fbAuthentication} from "../../utils/firebase";
import {saveDataToFirestore} from "../../utils/firestore";
import {cardSchemaFactory} from "../../utils/schemaFactories";
import ControlsGroup from "../controls/group/ControlsGroup";
import CardModal from "../modal/cardModal/CardModal";

import "./TopBar.scss";

function TopBar({onToggleSideBarButtonClick, isSideBarOpened, selectedFolder, userLogout, addCard}) {
    const [isCardModalShown, setIsCardModalShown] = useState(false);
    const [newCard, setNewCard] = useState({});

    function handleToggleSideBarButtonClick() {
        onToggleSideBarButtonClick();
    }

    function handleSaveDataButtonClick() {
        saveDataToFirestore().then(() => {
            toast.success("Your data has been saved correctly !");
        });
    }

    function handleLogoutButtonClick() {
        fbAuthentication.signOut();
        userLogout();
    }

    function handleAddCardButtonClick() {
        // TODO : Move this in cardFunctions.addCard (for the moment it's not primordial)
        // Cancel if the selected folder is not a folder created by user (a special folder)
        if (SPECIAL_FOLDERS_IDS.includes(selectedFolder.id)) {
            toast.warn("You can't create a card in this folder");
            return;
        }

        const newCard = cardSchemaFactory("",
            "",
            0,
            selectedFolder.id);

        setNewCard(newCard);
        addCard(newCard);

        setIsCardModalShown(true);
    }

    function handleModalClose() {
        setIsCardModalShown(false);
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
                        <button className="Button Button--Square" onClick={handleSaveDataButtonClick}><IoMdSave
                            className="Button__Icon"/></button>
                        <button className="Button Button--Square" onClick={handleLogoutButtonClick}><IoMdLogOut
                            className="Button__Icon"/></button>
                    </ControlsGroup>

                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        selectedFolder: selectedFolderSelector(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(userLogoutAction()),
        addCard: (card) => dispatch(addCardAction(card))
    };
}


TopBar.propTypes = {
    onToggleSideBarButtonClick: PropTypes.func.isRequired,
    isSideBarOpened: PropTypes.bool.isRequired,
    userLogout: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    selectedFolder: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TopBar));