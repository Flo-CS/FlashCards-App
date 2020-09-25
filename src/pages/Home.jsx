import React, {useEffect, useState} from "react";

import "./Home.scss"

import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";

import ClassNames from "classnames";
import CardsView from "../components/home/views/AllView";
import {cardSchemaFactory} from "../utils/schemaFactories";
import {setCards} from "../utils/firestore";

export default function Home() {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)

    function handleToggleSideBar() {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened)
    }

    const homeMainClasses = ClassNames({"home__main-view": true, "home__main-view--opened": isSideBarOpened})

    /*useEffect(() => {
        setCards([cardSchemaFactory("Coucou", "Hello", 5, "/main"),
            cardSchemaFactory("Coucou", "Hello", 5, "/main"),
            cardSchemaFactory("Coucou", "Hello", 5, "/main"),
            cardSchemaFactory("Coucou", "Hello", 5, "/main"),
            cardSchemaFactory("Coucou", "Hello", 5, "/main"),
            cardSchemaFactory("Coucou", "Hello", 5, "/main"),
            cardSchemaFactory("Coucou", "Hello", 5, "/main"),
            cardSchemaFactory("Coucou", "Hello", 5, "/main")])
    }, [])*/

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

