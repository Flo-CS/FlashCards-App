import ClassNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import FoldersTreeView from "./FoldersTree";
import NewFolderControls from "./NewFolder";

import "./SideBar.scss";


function SideBar({isOpened}) {

    const sideBarClasses = ClassNames({"SideBar": true, "SideBar--Opened": isOpened});

    return (<div className={sideBarClasses}>
        <div className="SideBar__Inner">
            <NewFolderControls/>
            <FoldersTreeView/>
        </div>
    </div>);
}

SideBar.propTypes = {
    isOpened: PropTypes.bool.isRequired,
};


export default React.memo(SideBar);
