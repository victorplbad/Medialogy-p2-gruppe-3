// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { useRef } from 'react';


import './giga.css'
import TopBar from "./components/TopBar";
import PageSettings from "./PageSettings";
import VideoList from "./VideoList";
import { overlayToggle, overlayShow, overlayHide } from './GlobalFunctions';

function App() {
    const hasTouch = "onTouchStart" in window || navigator.maxTouchPoints > 0;
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    // Touch start
    const TouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    // Touch End
    const TouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const deltaX = touchStartX.current - e.changedTouches[0].clientX;
        const deltaY = touchStartY.current - e.changedTouches[0].clientY;

        if (deltaX > 50) {
            overlayHide();
        }
        if (deltaX < -50) {
            overlayShow();
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    document.addEventListener("scroll", (event) => {
        const e = event as WheelEvent;
        if (e.deltaX > 5) overlayShow();
        if (e.deltaX < -5) overlayHide();
    });

    return (
        <div
            className="App"
            onTouchStart={TouchStart}
            onTouchEnd={TouchEnd}
        >
            {!hasTouch && (<button className="weirdButton" onClick={() => overlayToggle()}>Close overlay</button>)}

            <h1>Line 1</h1>
            This should be the biggest and most beautiful video there ever was
            {/*VideoPLayer followed by videolist */}
            <VideoList />

            {/*
                Above here should be the video player and new video selection
                Below here should be the menu/overlay functions
            */}

            <div className="overlay show">
                <TopBar />
                <div id="settings" className="menuItem remove">
                    <PageSettings />
                </div>
                <div id="stats" className="menuItem">
                      
                    <div />
                    <p>Du har spildt timer på shorts denne uge</p>
                    <p>Du kunne vist have været mere produktiv</p>

                </div>
                <div id="search_results" className="menuItem remove">
                    <p>Søge resultater lige her</p>
                </div>
            </div>
        </div>
    )
}


export default App