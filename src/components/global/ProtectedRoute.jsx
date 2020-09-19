import React from "react"
import {Route, Redirect} from "react-router-dom"

import {LOGIN} from "../../constants/routes"


export default function ProtectedRoute({component: Component, authenticated,...rest}) {
    return (
        <Route {...rest} render={
            (props) => {
                if (authenticated) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={{pathname: LOGIN, state: {from:props.location}}}/>
                }
            }
        }
        />
    )
}