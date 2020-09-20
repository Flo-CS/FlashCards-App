import React from "react"

import {IoMdSync} from "react-icons/io"

import "./AppLoading.scss"

export default function AppLoading(){
    return (<main className="loading">
            <IoMdSync className="loading__md-loading-icon"/>
    </main>)
}