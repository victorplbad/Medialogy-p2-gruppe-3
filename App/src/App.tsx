// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import React, { useRef } from 'react';

import './giga.css'
import TopBar from "./components/TopBar";
import PageSettings from "./PageSettings";
import { overlayToggle, overlayShow, overlayHide, onClickHandler, scrollHandler } from './GlobalFunctions';

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
    const UID = getUID();
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
                    <p>Du har brugt x timer på shorts denne uge</p>
                    <p>PLACEHOLDER</p>
                </div>
                <div id="search_results" className="menuItem remove">
                    <div className="search_results">
                        <div id="resultContainer" className="grid search">
                        </div>
                    </div>
                    <div className="spacer100"/>
                </div>
            </div>
            {/*Template elements*/}
            <div id="selector" className="remove">
                <div className="grid">
                    {VideoIDs.map((v, k) => (
                        <div
                            key={k}
                            className="portrait"
                            onClick={() => {//Can not be onPointerDown
                            }}
                        >
                            <span>K: {k} V: {v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App

function getUID(): string {
    let UID = getCookie("UID");
    if (UID === "") {
        UID = Math.floor(Math.random() * 100000000).toString();
    }
    setCookie("UID", UID);
    return UID;
}

function setCookie(name: string, value: string, expirationDays = 14) {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name: string): string {
    name += "=";
    const dCookie = decodeURIComponent(document.cookie);
    const cookies = dCookie.split(";");
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length);
        }
    }
    return "";
}