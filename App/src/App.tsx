// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import API_KEY from "./API_KEY";

import React, { useRef, useState } from 'react';

import './giga.css'
import TopBar from "./components/TopBar";
import PageSettings from "./PageSettings";
import VideoList from "./VideoList";
import { overlayToggle, overlayShow, overlayHide, playVideo, scrollHandler } from './GlobalFunctions';

import type { Video } from "./VideoType";

const VideoIDs = [
    "O3eYxjuYls4",
    "Uhgoqj2Aa6Q",
    "q7CgRt_-trM",
    "vfuVrjPZPr4",
    "rUWVxJU77RU",
    "O3eYxjuYls4",
];

function App() {
    const hasTouch = "onTouchStart" in window || navigator.maxTouchPoints > 0;
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const [page, setPage] = useState(0);

    // Touch start
    const TouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    // Touch End
    const TouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const deltaX = touchStartX.current - e.changedTouches[0].clientX;
        //const deltaY = touchStartY.current - e.changedTouches[0].clientY;

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
                {/* PAGE 0 */}
                <div id="selector" className="page active">
                    <div className="grid">
                        {VideoIDs.map((v, k) => (
                            <div
                                key={k}
                                className="portrait"
                                onClick={() => {//MUST NOT BE ON POINTER DOWN
                                    playVideo(v);
                                }}
                            >
                                <span>K: {k} V: {v}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="videoContainer">
                    <iframe id="videoPlayer" className="page"
                        src={undefined}
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
                    <p>Du har spildt x timer på shorts denne uge</p>
                    <p>Du kunne vist have været mere produktiv</p>
                </div>
                <div id="search_results" className="menuItem remove">
                    <div className="search_results">
                        <div id="resultContainer" className="grid search">
                        </div>
                    </div>
                    <div className="spacer100"/>
                </div>
            </div>
        </div>
    )
}

export default App