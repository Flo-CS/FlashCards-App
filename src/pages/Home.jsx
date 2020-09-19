import React, {useEffect, useState} from "react";
import {connect} from "react-redux"

import "./Home.scss"

import AppTopBar from "../components/home/AppTopBar";
import AppSideBar from "../components/home/AppSideBar";

import store from "../store/Store";

import {cardsSelectors} from "../selectors/CardsSelectors";
import {setCardsAction} from "../actions/CardsActions";

import {getCards} from "../helpers/database";
import ClassNames from "classnames";


function Home({cards}) {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)



    useEffect(() => {
        getCards().then((doc) => {
            const data = doc.data()
            const cards = data.cards

            store.dispatch(setCardsAction(cards))
        })
    }, [])

    function handleToggleSideBar() {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened)
    }

    const homeMainClasses = ClassNames({"main": true, "main--opened": isSideBarOpened})

    return (
        <div className="home">
            <AppTopBar onToggleSideBarButtonClick={handleToggleSideBar}
                       isSideBarOpened={isSideBarOpened}/>
            <AppSideBar isOpened={isSideBarOpened} />
            <div className="home__wrapper">
                <main className={homeMainClasses}>
                    {JSON.stringify(cards)}
                </main>
            </div>
        </div>
    )

}

function mapStateToProps(state) {
    return {
        cards: cardsSelectors(state),
    }
}

/*function mapDispatchToProps(dispatch) {
    return {

    }
}*/


export default connect(mapStateToProps)(Home)