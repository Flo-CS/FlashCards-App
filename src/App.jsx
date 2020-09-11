import React, {useState} from 'react';

import './App.scss';

import AppTopBar from "./Components/layout/AppTopBar";
import AppSideBar from "./Components/layout/AppSideBar"


function App() {

    const [isSideBarOpened, setIsSideBarOpened] = useState(false)


    function handleToggleSideBar()
    {
        setIsSideBarOpened(isSideBarOpened => !isSideBarOpened)
    }

    return (
        <div className="app">
            <AppTopBar onToggleSideBarButtonClick={handleToggleSideBar} isSideBarOpened={isSideBarOpened}/>
            <div className="content-wrapper">
                <AppSideBar isOpened={isSideBarOpened}/>
                <main className="main-content">
                </main>
            </div>
        </div>
    );
}

export default App;
