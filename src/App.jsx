import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.scss';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


export default function App() {


    return (<div className="app">
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact>
                        <Home/>
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}