import React from "react";
import {Redirect, Route} from "react-router-dom";

import {HOME} from "../../constants/routes";


export default function AuthRoute({component: Component, redirect, ...rest}) {
    return (
        <Route {...rest} render={
            (props) => {
                if (!redirect) {
                    return <Component {...props}/>;
                } else {
                    return <Redirect to={{pathname: HOME, state: {from: props.location}}}/>;
                }
            }
        }
        />
    );
}