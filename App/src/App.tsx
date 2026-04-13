import { useState, useRef } from "react";
import "./App.css";

function App() {
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
    if (page === 1 && e.deltaY < -40) {
      goToPage(0); // scroll up → go back
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
      goToPage(0); // swipe down → go back
    }

    touchStartY.current = null;
  };

  return (
    <div 
      className="app"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slider"
        style={{ transform: `translateY(-${page * 100}vh)` }}
      >
        {/* PAGE 1 */}
        <div className="page choice-page">
          <div className="grid">
            {[...Array(6)].map((_, i) => (
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
            ))}
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="page video-page">
          <h1>Video Page (placeholder)</h1>
        </div>
      </div>
    </div>
  );
}

export default App;