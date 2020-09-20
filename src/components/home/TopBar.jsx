import React from "react"

import "./TopBar.scss"

import {IoMdAdd, IoMdLogOut, IoMdMenu, IoMdSearch, IoMdClose} from "react-icons/io"
import {fbAuthentication} from "../../helpers/firebase";

function TopBar({onToggleSideBarButtonClick, isSideBarOpened}) {

    function handleToggleSideBarButtonClick() {
        onToggleSideBarButtonClick()
    }

    function handleLogoutButtonClick() {
        fbAuthentication.signOut()
    }

    return (
        <div className="top-bar">
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
                    <button className="top-bar__button">
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