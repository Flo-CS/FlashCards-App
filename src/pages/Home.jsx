import React, {useState} from "react";
import ClassNames from "classnames";

import "./Home.scss"

import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";

import CardsView from "../components/home/views/CardsView";

export default function Home() {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)

    function handleToggleSideBar() {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened)
    }

    const homeMainClasses = ClassNames({"home__main-view": true, "home__main-view--opened": isSideBarOpened})


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

