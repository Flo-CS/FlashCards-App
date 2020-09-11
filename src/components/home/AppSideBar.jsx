import React from "react"
import ClassNames from "classnames"

import "./AppSideBar.scss"

export default function AppSideBar({isOpened}) {

    const sideBarClasses = ClassNames({"side-bar": true, "side-bar--opened": isOpened})

    return (<div className={sideBarClasses}>
        <div className="side-bar__inner">

        </div>
    </div>)
}