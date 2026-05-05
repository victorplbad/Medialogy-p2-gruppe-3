// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import React, { useState, useRef } from 'react';

import './giga.css'
import TopBar from "./components/TopBar";
import PageSettings from "./PageSettings";
import { overlayToggle, overlayShow, overlayHide, scrollHandler } from './GlobalFunctions';
import pal from "./Palantir";

function App() {
    const hasTouch = "onTouchStart" in window || navigator.maxTouchPoints > 0;
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const [sessionTime, uTime] = useState(0);
    const [shorts, uShorts] = useState("");
    const [timeToday, uTimeToday] = useState(0);

    function updateStats() {
        uTime(sessionTime + 1000);
        uShorts(localStorage.getItem(pal.TodayString() + "vNum") || "0");
        uTimeToday(pal.DayTime());
    }
    setTimeout(updateStats, 1000);

    // Touch start
    const TouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    // Touch End
    const TouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const deltaX = touchStartX.current - e.changedTouches[0].clientX;

        if (deltaX > 50) {
            overlayHide();
        }
        if (deltaX < -50) {
            overlayShow();
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    return (
        <div
            className="App"
            onWheel={scrollHandler}
            onTouchStart={TouchStart}
            onTouchEnd={TouchEnd}
        >
            {!hasTouch && (<button className="weirdButton" onClick={() => overlayToggle()}>Close overlay</button>)}
            {/*VideoPLayer followed by videoselection implementation*/}
            {/*<VideoList />*/}
            <div id="videoPanel" className="fill">
                <div id="vContainer1" className="videoContainer hide page">
                    <iframe id="videoPlayer" className="remove"
                        src="about: blank"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                </div>
                <div id="vContainer2" className="videoContainer hide page up">
                    <iframe id="videoPlayer" className="remove"
                        src="about:blank"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                </div>
                <div id="vContainer3" className="videoContainer hide page down">
                    <iframe id="videoPlayer" className="remove"
                        src="about: blank"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                </div>
            </div>
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
                    <h4>i denne session har du været her {sessionTime / 1000} sekunder</h4>
                    <h4>Du har brugt: {timeToday} sekunder på shorts idag</h4>
                    <h4>Du har set {shorts} shorts idag</h4>
                </div>
                <div id="search_results" className="menuItem remove">
                    <div className="search_results">
                        <div id="resultContainer" className="grid search">
                        </div>
                    </div>
                    <div className="spacer100" />
                </div>
            </div>
            {/*Template elements*/}
            <div id="selector" className="remove">
                <div id="lootboxContainer" className="grid">
                </div>
            </div>
        </div>
    )
}

export default App