// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { useRef, useState, useEffect } from 'react';

import './giga.css'
import TopBar from "./components/TopBar";
import PageSettings from "./PageSettings";
import VideoList from "./VideoList";
import { overlayToggle, overlayShow, overlayHide } from './GlobalFunctions';
import API_KEY from "./API_KEY";

import type { Video } from "./VideoType";

const VideoIDs = [
    "O3eYxjuYls4",
    "Uhgoqj2Aa6Q",
    "q7CgRt_-trM",
    "vfuVrjPZPr4",
    "rUWVxJU77RU"
];

function formatDuration(iso: string) {
    const match = iso.match(/PT(\d+M)?(\d+S)?/);
    const minutes = match?.[1]?.replace("M", "") || "0";
    const seconds = match?.[2]?.replace("S", "") || "00";
    return `${minutes}:${seconds.padStart(2, "0")}`;
}

function App() {
    const hasTouch = "onTouchStart" in window || navigator.maxTouchPoints > 0;
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${VideoIDs.join(",")}&key=${API_KEY}`
            );

            const data = await res.json();

            const parsed: Video[] = data.items.map((item: any) => ({
                id: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                duration: formatDuration(item.contentDetails.duration),
            }));

            setVideos(parsed);
        };
        fetchVideos();
        console.log(videos.length);
    }, []);

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
            {/*VideoPLayer followed by videoselection implementation*/}
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
                    <p>Du har spildt x timer på shorts denne uge</p>
                    <p>Du kunne vist have været mere produktiv</p>
                </div>
                <div id="search_results" className="menuItem remove">
                    <div className="search_results">
                        <div className="grid search">
                            {videos.length === 0 ? (
                                <p className="loading">Loading...</p>
                            ) : (videos.map((video) => (
                                <div
                                    key={video.ID}
                                    className="portrait search"
                                    onPointerUp={() => {
                                        setSelectedVideo(video.ID);
                                        overlayHide();
                                    }}
                                >
                                    <img src={video.thumbnail} />

                                    <div className="ThumbOverlay">
                                        <span className="title">{video.title}</span>
                                        <span className="duration">{video.duration}</span>
                                    </div>
                                </div>
                            ))
                            )}
                        </div>
                    </div>
                    <div className="spacer100"/>
                </div>
            </div>
        </div>
    )
}

export default App