import React from "react";

import {IoMdSync} from "react-icons/io";

import "./AppLoading.scss";

export default function AppLoading() {
    return (<main className="AppLoading">
        <IoMdSync className="AppLoading__MdLoadingIcon"/>
    </main>);
}