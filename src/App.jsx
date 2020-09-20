import React, {useEffect} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import './App.scss';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {isAuthenticatedSelector, isAuthLoadingSelector} from "./selectors/authSelectors";
import {setIsAuthenticatedAction, setIsAuthLoadingAction} from "./actions/authActions";

import {fbAuthentication} from "./helpers/firebase";

import ProtectedRoute from "./components/session/ProtectedRoute";
import AuthRoute from "./components/session/AuthRoute";
import {HOME, LOGIN, REGISTER} from "./constants/routes";
import NotFound from "./pages/NotFound";
import AppLoading from "./pages/AppLoading";

function App({isAuthenticated, isAuthLoading, setIsAuthenticated, setIsAuthLoading}) {

    useEffect(() => {
        fbAuthentication.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            setIsAuthLoading(false)
        })
    }, [setIsAuthLoading, setIsAuthenticated])

    return (<div className="app">
            {isAuthLoading ? (<AppLoading/>) : (
                <Router>
                    <Switch>
                        <Route path={HOME} exact component={Home} authenticated={isAuthenticated}/>
                        <Route path={LOGIN} component={Login} redirect={isAuthenticated}/>
                        <Route path={REGISTER} component={Register} redirect={isAuthenticated}/>
                        <Route path={"*"} component={NotFound}/>
                    </Switch>
                </Router>)
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