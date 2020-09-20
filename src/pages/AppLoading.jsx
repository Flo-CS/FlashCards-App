import React from "react"

import {IoIosRefreshCircle} from "react-icons/io"

import "./AppLoading.scss"

export default function AppLoading(){
    return (<main className="loading">
            <IoIosRefreshCircle className="loading__ios-loading-icon"/>
    </main>)
}