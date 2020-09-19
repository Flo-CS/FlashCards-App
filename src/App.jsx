import React, {useEffect} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import './App.scss';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {isAuthenticatedSelector, isAuthLoadingSelector} from "./selectors/authSelectors";
import {setIsAuthenticatedAction, setIsAuthLoadingAction} from "./actions/authActions";

import {firebaseAuth} from "./utils/firebase";

import ProtectedRoute from "./components/global/ProtectedRoute";

function App({isAuthenticated, isAuthLoading, setIsAuthenticated, setIsAuthLoading}) {

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            setIsAuthLoading(false)
        })
    }, [setIsAuthLoading, setIsAuthenticated])

    return (<div className="app">
            {!isAuthLoading ? (
                <Router>
                    <Switch>
                        <ProtectedRoute path="/" exact component={Home} authenticated={isAuthenticated}/>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register}/>
                    </Switch>
                </Router>) : ("Loading...")
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: isAuthenticatedSelector(state),
        isAuthLoading: isAuthLoadingSelector(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setIsAuthenticated: (value) => dispatch(setIsAuthenticatedAction(value)),
        setIsAuthLoading: (value) => dispatch(setIsAuthLoadingAction(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)