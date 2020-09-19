import React, {useEffect} from "react"
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {connect} from "react-redux";

import './App.scss';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {isAuthenticatedSelector, isAuthLoadingSelector} from "./selectors/AuthSelectors";
import {setIsAuthenticatedAction, setIsAuthLoadingAction} from "./actions/AuthActions";

import {firebaseAuth} from "./helpers/firebase";

import ProtectedRoute from "./components/global/ProtectedRoute";
import AuthRoute from "./components/global/AuthRoute";

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
                        <AuthRoute path="/login" component={Login} redirect={isAuthenticated}/>
                        <AuthRoute path="/register" component={Register} redirect={isAuthenticated}/>
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