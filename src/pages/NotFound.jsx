import React from "react"

import "./NotFound.scss"
import {Link} from "react-router-dom";
import {HOME} from "../constants/routes";

export default function NotFound() {
    return (<main className="not-found">
        <h1 className="not-found__title">404 Not Found :/</h1>
        <Link to={HOME} className="not-found__link">Go to home</Link>
    </main>)
}