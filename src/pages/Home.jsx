import AppTopBar from "../Components/home/AppTopBar";
import AppSideBar from "../Components/home/AppSideBar";
import React, {useState} from "react";

export default function Home() {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)


    function handleToggleSideBar() {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened)
    }

    return (<div className="home-page">
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
