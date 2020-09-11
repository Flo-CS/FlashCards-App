import AppTopBar from "../components/home/AppTopBar";
import AppSideBar from "../components/home/AppSideBar";
import React, {useState} from "react";

export default function Home() {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)


    function handleToggleSideBar() {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened)
    }

    return (
        <div className="home">
            <AppTopBar onToggleSideBarButtonClick={handleToggleSideBar}
                       isSideBarOpened={isSideBarOpened}/>
            <div className="content-wrapper">
                <AppSideBar isOpened={isSideBarOpened}/>
                <main className="main-content">
                </main>
            </div>
        </div>
    )

}
