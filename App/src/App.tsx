import { useState, useRef, useEffect } from "react";
import TopBar from "./components/TopBar";
import type {Video} from "./Video"
import "./App.css";

const API_KEY = "AIzaSyDXTNGsNnpiTPdUpQNnL3ZzPyeK9YMBMqQ";
// const API_KEY = import.meta.env.keyname;



//example video ID:
const videoIds = [
    "WnRhXpJCO28",
    "-chf_4a07Rg",
];

function formatDuration(iso: string) {
    const match = iso.match(/PT(\d+M)?(\d+S)?/);
    const minutes = match?.[1]?.replace("M","") || "0";
    const seconds = match?.[2]?.replace("S","") || "00";
    return `${minutes}:${seconds.padStart(2, "0")}`;
}





function App() {
  const [page, setPage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  const touchStartY = useRef<number | null>(null); 
  const isAnimating = useRef(false);

  useEffect(() => {
    const fetchVideos = async () => {
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(",")}&key=${API_KEY}`
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
  }, []);

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
    if (page === 1 && e.deltaY < -40) {
      goToPage(0); // scroll up to go back
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
      backgroundColor:"#8C8C8C",
    },
  }as const;

  return (
    <div
      style={styles.container} 
      className="app"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <TopBar/>
      <div
        className="slider"
        style={{ transform: `translateY(-${page * 100}vh)` }}
      >
        {/* PAGE 1 */}
        <div className="page choice-page">
          <div className="grid">
            {videos.length === 0 ? (
                <p className="loading">Loading...</p>
            ) : (
              videos.map((video) => (
                  <div
                    key={video.id}
                    className="portrait"
                    onPointerUp={() => {
                      setSelectedVideo(video.id);
                      setTimeout(() => setPage(1), 80);
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


            {/* {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="portrait"
                onPointerDown={() => {
                  setTimeout(() => {
                    setPage(1);
                  }, 120); //delay on click
                  }}
              >
                <span>Thumbnail {i + 1}</span>
              </div>
            ))} */}
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="page video-page">
          {selectedVideo && (
            <div className="video-container">
                <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;