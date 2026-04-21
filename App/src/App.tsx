import { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import "./App.css";

function App() {
  const [page, setPage] = useState<0 | 1>(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const touchStartY = useRef<number | null>(null); 
  const isAnimating = useRef(false);

  const goToPage = (target: 0 | 1, dir?: "up" | "down") => {
    if (isAnimating.current) return;

    setDirection(dir ?? (target > page ? "down" : "up"));

    isAnimating.current = true;
    setPage(target);

    setTimeout(() => {
      isAnimating.current = false;
    }, 600); //match css transition
  };

  // PC control - ScrollWheel
  const handleWheel = (e: React.WheelEvent) => {
    if (page === 1 && e.deltaY < 0) {
      goToPage(0, "up"); 
    }
    if (page === 1 && e.deltaY > 0) {
      goToPage(0, "down");
      // alert("hej");
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
        // style={{ transform: `translateY(-${page * 100}vh)` }}
      >
        {/* PAGE 1 */}
        <div className={`page choice-page ${
          page === 0 
            ? "active"
            : direction === "up"
            ? "enter-bottom"
            : "enter-top"
          }`}
        >
          <div className="grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="portrait"
                onPointerDown={() => {
                    goToPage(1, "down");
                  }
                }
              >
                <span>Thumbnail {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PAGE 2 */}
        <div className={`page video-page ${
          page === 1 
            ? "active" 
            : direction === "up"
            ? "enter-bottom"
            : "enter-top"
          }`}
        >
          <h1>Video Page (placeholder)</h1>
          
        </div>
      </div>
    </div>
  );
}

export default App;