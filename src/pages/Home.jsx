import React, {useState} from "react";

import "./Home.scss"

import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";

import ClassNames from "classnames";
import CardsView from "../components/home/views/AllView";

export default function Home() {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)

    function handleToggleSideBar() {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened)
    }

    const homeMainClasses = ClassNames({"main-view": true, "main-view--opened": isSideBarOpened})

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

