import React from "react";
import {Link} from "react-router-dom";
import {HOME} from "../constants/routes";

import "./NotFound.scss";

export default function NotFound() {
    return (<main className="NotFound">
        <h1 className="NotFound__Title">404 Not Found :/</h1>
        <Link to={HOME} className="NotFound__Link">Go to home</Link>
    </main>);
}