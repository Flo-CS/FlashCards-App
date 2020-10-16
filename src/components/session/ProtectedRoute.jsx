import React from "react"
import {Redirect, Route} from "react-router-dom"

import {SIGN_IN} from "../../constants/routes"


export default function ProtectedRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route {...rest} render={
            (props) => {
                if (authenticated) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={{pathname: SIGN_IN, state: {from: props.location}}}/>
                }
            }
        }
        />
    )
}