import React from "react"

import "./TopBar.scss"

import {IoMdAdd, IoMdSettings, IoMdMenu, IoMdSearch, IoMdClose} from "react-icons/io"

function TopBar({onToggleSideBarButtonClick, isSideBarOpened}) {

    function handleToggleSideBarButtonClick() {
        onToggleSideBarButtonClick()
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
                    <button className="top-bar__button">
                        <IoMdSettings className="top-bar__md-gear-icon"/>
                    </button>
                </div>

            </div>

        </div>
    )
}
export default React.memo(TopBar)