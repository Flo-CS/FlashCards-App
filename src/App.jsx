import React, {lazy, Suspense, useEffect} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Slide, toast, ToastContainer} from "react-toastify";
import {setIsAuthenticatedAction, setIsAuthLoadingAction} from "./actions/authActions";

import './App.scss';
import "./components/controls/Controls.scss";


import AuthRoute from "./components/session/AuthRoute";

import ProtectedRoute from "./components/session/ProtectedRoute";
import "./components/toastify/main.scss";
import {HOME, SIGN_IN, SIGN_UP} from "./constants/routes";
import AppLoading from "./pages/AppLoading";
import NotFound from "./pages/NotFound";
import {isAuthenticatedSelector, isAuthLoadingSelector} from "./selectors/authSelectors";

import {fbAuthentication} from "./utils/firebase";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

function App({isAuthenticated, isAuthLoading, setIsAuthenticated, setIsAuthLoading}) {

    useEffect(() => {
        fbAuthentication.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setIsAuthLoading(false);
        });
    }, [setIsAuthLoading, setIsAuthenticated]);

    return (<div className="App">
            {isAuthLoading ? (<AppLoading/>) : (
                <Router>
                    <Suspense fallback={<AppLoading/>}>
                        <Switch>
                            <ProtectedRoute path={HOME} exact component={Home} authenticated={isAuthenticated}/>
                            <AuthRoute path={SIGN_IN} component={SignIn} redirect={isAuthenticated}/>
                            <AuthRoute path={SIGN_UP} component={SignUp} redirect={isAuthenticated}/>
                            <Route path={"*"} component={NotFound}/>
                        </Switch>
                    </Suspense>
                </Router>)
            }
            <ToastContainer
                position={toast.POSITION.TOP_CENTER}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
                limit={2}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: isAuthenticatedSelector(state),
        isAuthLoading: isAuthLoadingSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setIsAuthenticated: (value) => dispatch(setIsAuthenticatedAction(value)),
        setIsAuthLoading: (value) => dispatch(setIsAuthLoadingAction(value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);