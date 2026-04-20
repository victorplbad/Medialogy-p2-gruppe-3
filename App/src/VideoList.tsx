import { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import Comments from "./Comments";
import BottomPanel from "./BottomPanel";

import "./giga.css";

function VideoList() {
    const [page, setPage] = useState(0);

    const touchStartY = useRef<number | null>(null);
    const isAnimating = useRef(false);

    const goToPage = (target: number) => {
        if (isAnimating.current) return;

        isAnimating.current = true;
        setPage(target);

        setTimeout(() => {
            isAnimating.current = false;
        }, 600); //match css transition
    };

    // PC control - ScrollWheel
    const handleWheel = (e: React.WheelEvent) => {
        if (page === 0 && e.deltaY > 0) {
            goToPage(1); //Go to next video selector
        }
    };

    // Touch start
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    // Touch End
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartY.current === null) return;

        const deltaY = touchStartY.current - e.changedTouches[0].clientY;

        if (page === 1 && deltaY < -50) {
            goToPage(0); // swipe down to go back
        }

        touchStartY.current = null;
    };

    const styles = {
        container: {
            backgroundColor: "#8C8C8C",
        },
    } as const;

    return (
        <div
            style={styles.container}
            className="App"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div id="videoPanel" className="fill">

                {/* PAGE 1 */}
                {/*<div className="page choice-page">*/}
                {/*    <div className="grid">*/}
                {/*        {[...Array(6)].map((_, i) => (*/}
                {/*            <div*/}
                {/*                key={i}*/}
                {/*                className="portrait"*/}
                {/*                onPointerDown={() => {*/}
                {/*                    setTimeout(() => {*/}
                {/*                        setPage(1);*/}
                {/*                    }, 120); //delay on click*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                <span>Thumbnail {i + 1}</span>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* PAGE 2 */}
                {/*<div className="page video-page videoContainer">*/}
                {/*    <iframe id="videoPlayer"*/}
                {/*        src=""*/}
                {/*        allow="autoplay; encrypted-media"*/}
                {/*        allowFullScreen*/}
                {/*    />*/}
                {/*    */}{/*<Comments />*/}
                {/*    */}{/*<BottomPanel />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default VideoList;