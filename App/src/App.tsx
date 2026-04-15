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
    const touchStart = useRef<number | null>(null);
    // Touch start
    const TouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.touches[0].clientX;
    };

    // Touch End
    const TouchEnd = (e: React.TouchEvent) => {
        if (touchStart.current === null) return;

        const delta = touchStart.current - e.changedTouches[0].clientX;

        if (delta > 50) {
            overlayHide();
        }
        if (delta < -50) {
            overlayShow();
        }
        touchStart.current = null;
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
            There should be a beatiful video about something here

            <div className="overlay show">
                <TopBar />
                <div id="settings" className="menuItem remove">
                    <PageSettings />
                </div>
                <div id="stats" className="menuItem">
                    <h1>PUT STATS HERE</h1>
                    I Stole googles AI search image and you can't stop me(im pretty sure its public since it links to W3.org)
                    <div/>
                    Which does explain why *every* web page uses the same image for ai functions
                </div>
                <div id="video_list" className="menuItem remove">
                    {/*VideoPLayer followed by videolist */}
                    <VideoList />
                </div>
            </div>
        </div>
    )
}

export default App