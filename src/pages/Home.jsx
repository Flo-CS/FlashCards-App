import ClassNames from "classnames";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useMediaQuery} from "react-responsive/src";
import {setCardsAction} from "../actions/cardsActions";
import {setFoldersAction} from "../actions/foldersActions";

import CardsView from "../components/home/CardsView";
import SideBar from "../components/home/SideBar";

import TopBar from "../components/home/TopBar";
import {firestoreGetUserData} from "../utils/firestore";

import "./Home.scss";

function Home({setFolders, setCards}) {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: "(min-width: 768px"});

    function handleToggleSideBar() {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened);
    }

    // Get folders and cards (user data) at the start
    useEffect(() => {
        firestoreGetUserData().then((doc) => {
            const data = doc.data();
            const folders = data.folders;
            const cards = data.cards;
            setFolders(folders);
            setCards(cards);
        });
    }, [setCards, setFolders]);


    useEffect(() => {
        setIsSideBarOpened(isTabletOrMobile);
    }, [isTabletOrMobile]);

    const homeMainClasses = ClassNames({"Home__Main": true, "Home__Main--Opened": isSideBarOpened});

    return (
        <div className="Home">
            <TopBar onToggleSideBarButtonClick={handleToggleSideBar}
                    isSideBarOpened={isSideBarOpened}/>
            <SideBar isOpened={isSideBarOpened}/>
            <div className="Home__Wrapper">
                <main className={homeMainClasses}>
                    <CardsView/>
                </main>
            </div>
        </div>
    );

}

function mapDispatchToProps(dispatch) {
    return {
        setFolders: (folders) => dispatch(setFoldersAction(folders)),
        setCards: (cards) => dispatch(setCardsAction(cards))
    };

}

Home.propTypes = {
    setFolders: PropTypes.func.isRequired,
    setCards: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Home);

