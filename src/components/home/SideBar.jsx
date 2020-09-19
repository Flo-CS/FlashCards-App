import React from "react"
import ClassNames from "classnames"

import "./SideBar.scss"

function SideBar({isOpened}) {

    const sideBarClasses = ClassNames({"side-bar": true, "side-bar--opened": isOpened})

    return (<div className={sideBarClasses}>
        <div className="side-bar__inner">

        </div>
    </div>)
}

export default  React.memo(SideBar)