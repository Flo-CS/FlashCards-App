import React, {lazy, Suspense, useEffect} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import './App.scss';
import {isAuthenticatedSelector, isAuthLoadingSelector} from "./selectors/authSelectors";
import {setIsAuthenticatedAction, setIsAuthLoadingAction} from "./actions/authActions";

import {fbAuthentication} from "./utils/firebase";

import ProtectedRoute from "./components/session/ProtectedRoute";
import AuthRoute from "./components/session/AuthRoute";
import {HOME, LOGIN, REGISTER} from "./constants/routes";
import NotFound from "./pages/NotFound";
import AppLoading from "./pages/AppLoading";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

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
                    <Suspense fallback={<AppLoading/>}>
                        <Switch>
                            <ProtectedRoute path={HOME} exact component={Home} authenticated={isAuthenticated}/>
                            <AuthRoute path={LOGIN} component={Login} redirect={isAuthenticated}/>
                            <AuthRoute path={REGISTER} component={Register} redirect={isAuthenticated}/>
                            <Route path={"*"} component={NotFound}/>
                        </Switch>
                    </Suspense>
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