import React from "react"

import {IoMdSync} from "react-icons/io"

import "./AppLoading.scss"

export default function AppLoading(){
    return (<main className="app-loading">
            <IoMdSync className="app-loading__md-loading-icon"/>
    </main>)
}