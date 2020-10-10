import React, {useEffect, useState} from "react";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import ClassNames from "classnames";

import "./Home.scss"

import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";

import CardsView from "../components/home/CardsView";
import {useMediaQuery} from "react-responsive/src";
import {firestoreGetUserData} from "../utils/firestore";
import {setFoldersAction} from "../actions/foldersActions";
import {setCardsAction} from "../actions/cardsActions";

function Home({setFolders, setCards}) {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)
    const isTabletOrMobile = useMediaQuery({query: "(min-width: 768px"})

    function handleToggleSideBar() {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened)
    }

    // Get folders and cards (user data) at the start
    useEffect(() => {
        firestoreGetUserData().then((doc) => {
            const data = doc.data()
            const folders = data.folders
            const cards = data.cards
            setFolders(folders)
            setCards(cards)
        })
    }, [setCards, setFolders])


    useEffect(() => {
        setIsSideBarOpened(isTabletOrMobile)
    }, [isTabletOrMobile])

    const homeMainClasses = ClassNames({"home__main": true, "home__main--opened": isSideBarOpened})

    return (
        <div className="home">
            <TopBar onToggleSideBarButtonClick={handleToggleSideBar}
                    isSideBarOpened={isSideBarOpened}/>
            <SideBar isOpened={isSideBarOpened}/>
            <div className="home__wrapper">
                <main className={homeMainClasses}>
                    <CardsView/>
                </main>
            </div>
        </div>
    )

}

function mapDispatchToProps(dispatch) {
    return {
        setFolders: (folders) => dispatch(setFoldersAction(folders)),
        setCards: (cards) => dispatch(setCardsAction(cards))
    }

}

Home.propTypes = {
    setFolders: PropTypes.func.isRequired,
    setCards: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Home)

