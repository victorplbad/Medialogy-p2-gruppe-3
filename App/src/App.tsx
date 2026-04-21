// import { useState, useRef } from "react";
// import TopBar from "./components/TopBar";
// import "./App.css";

// function App() {
//   // const [page, setPage] = useState<0 | 1>(0);
//   // const [direction, setDirection] = useState<"up" | "down">("down");
//   // const [prevPage, setPrevPage] = useState<0 | 1>(0);

  
//   // type Transition = 
//   //   | "video-to-grid-up"
//   //   | "video-to-grid-down"
//   //   | "grid-to-video-click"
//   //   | "grid-to-video-scroll";
  
//   // const [transition, setTransition] = useState<Transition>("grid-to-video-click");
  
//   const [index, setIndex] = useState(0); // 0 = grid | 1 = video
//   const [offset, setOffset] = useState(0); // -1, 0, 1

//   const touchStartY = useRef<number | null>(null); 
//   const isAnimating = useRef(false);
//   // const goTo = (target: 0 | 1) => {
//   //   if (isAnimating.current || target === index) return;

//   //   isAnimating.current = true;
//   //   setIndex(target);

//   //   setTimeout(() => {
//   //     isAnimating.current = false;
//   //   }, 500);
//   // };

//   const sliderRef = useRef<HTMLDivElement>(null);

//   const animateTo = (target: 0 | 1, mode: "from-top" | "from-bottom") => {
//     if (!sliderRef.current) return;

//     const el = sliderRef.current;

//     isAnimating.current = true;

//     el.style.transition = "none";

//     if (mode === "from-bottom") {
//       el.style.transform = `translateY(${target === 1 ? "100vh" : "-100vh"})`;
//     } else {
//       el.style.transform = `translateY(${target === 1 ? "-100vh" : "100vh"})`;
//     }

//     el.getBoundingClientRect();

//     el.style.transition = "transform 0.5s ease";

//     el.style.transform = `translateY(-${target * 100}vh)`;

//     setIndex(target);

//     setTimeout(() => {
//       isAnimating.current = false;
//     }, 500);
//   };

//   // PC control - ScrollWheel
//   const handleWheel = (e: React.WheelEvent) => {
//     if (isAnimating.current) return;

//     if (index === 1) {
//       animateTo(0, e.deltaY > 0 ? "from-bottom" : "from-top");
//     } else {
//       animateTo(1, "from-top");
//     }

//   };

//     // if (page === 0) {
//     //   if (e.deltaY !==0) {
//     //     goToPage(1, e.deltaY > 0 ? "scroll-down" : "scroll-up");
//     //   }
//     // }

//     // if (e.deltaY > 0) {
//     //   // scroll down
//     //   if (page === 0) goToPage(1, "down");
//     // } else {
//     //   // scroll up
//     //   if (page === 1) goToPage(0, "up");
//     // }

//   // Touch start
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartY.current = e.touches[0].clientY;
//   };
  
//   // Touch End
//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (!sliderRef.current || touchStartY.current === null) return;

//     const deltaY = touchStartY.current - e.changedTouches[0].clientY;

//     if (Math.abs(deltaY) < 50) return;

//     if (index === 1) {
//       animateTo(0, deltaY > 0 ? "from-bottom" : "from-top");
//     } else {
//       animateTo(1, "from-top");
//     }

//     touchStartY.current = null;
//   };

//   // const handleTouchEnd = (e: React.TouchEvent) => {
//   //   if (touchStartY.current === null) return;

//   //   const deltaY = touchStartY.current - e.changedTouches[0].clientY;

//   //   if (page === 1 && deltaY < -50) {
//   //     goToPage(0, "scroll-down"); // swipe down to go back
//   //   }

//   //   touchStartY.current = null;
//   // };

//   const styles = {
//     container: {
//       backgroundColor:"#8C8C8C",
//     },
//   }as const;

//   return (
//     <div
//       style={styles.container} 
//       className="app"
//       onWheel={handleWheel}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       <TopBar/>

//       <div
//         className="slider" ref={sliderRef}>
//         {/* GRID PAGE */}
//         <div className="page choice-page">
//           <div className="grid">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="portrait"
//                 onPointerDown={() => {
//                     animateTo(1, "from-bottom");
//                 }}
//               >
//                 <span>Thumbnail {i + 1}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* PAGE 2 */}
//         <div className="page video-page">
//           <h1>Video Page (placeholder)</h1>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState, useRef, useCallback } from "react";
import TopBar from "./components/TopBar";
import "./App.css";

type PageType = "grid" | "video";

function App() {
  // What's currently visible
  const [current, setCurrent] = useState<PageType>("grid");

  // The slider is a 3-slot column. We control which slot is on-screen
  // via a CSS class on the wrapper. Slots: top(-100vh) | mid(0) | bot(+100vh)
  // "mid" = at rest (visible). We start at mid.
  const [sliderPos, setSliderPos] = useState<"top" | "mid" | "bot">("mid");

  // What page is rendered in each slot
  // Initially: top=video, mid=grid, bot=video
  const [slots, setSlots] = useState<[PageType, PageType, PageType]>(
    ["video", "grid", "video"]
  );

  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const navigate = useCallback((dir: "up" | "down") => {
    if (isAnimating.current) return;
    const el = sliderRef.current;
    if (!el) return;

    isAnimating.current = true;

    const next: PageType = current === "grid" ? "video" : "grid";

    if (dir === "up") {
      // Next page is BELOW (bot slot). Pre-place without transition.
      setSlots([current, current, next]);
      setSliderPos("mid"); // stay at mid while we set up

      // Let React render the new bot slot, then animate up to it
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setSliderPos("bot"); // triggers CSS transition: slide up
        setCurrent(next);

        setTimeout(() => {
          // Snap back to mid silently: next is now mid, prepare neighbors
          el.style.transition = "none";
          setSlots([current, next, current]);
          setSliderPos("mid");
          requestAnimationFrame(() => {
            el.style.transition = ""; // restore CSS transition
            isAnimating.current = false;
          });
        }, 500);
      }));
    } else {
      // Next page is ABOVE (top slot). Pre-place without transition.
      setSlots([next, current, current]);
      setSliderPos("mid");

      requestAnimationFrame(() => requestAnimationFrame(() => {
        setSliderPos("top"); // triggers CSS transition: slide down
        setCurrent(next);

        setTimeout(() => {
          el.style.transition = "none";
          setSlots([current, next, current]);
          setSliderPos("mid");
          requestAnimationFrame(() => {
            el.style.transition = "";
            isAnimating.current = false;
          });
        }, 500);
      }));
    }
  }, [current]);

  const handleWheel = (e: React.WheelEvent) => {
    if (isAnimating.current) return;
    if (current === "grid" && e.deltaY > 0) return;
    navigate(e.deltaY > 0 ? "up" : "down");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 50) return;
    if (current === "grid" && delta > 0) { touchStartY.current = null; return; }
    navigate(delta > 0 ? "up" : "down");
    touchStartY.current = null;
  };

  const renderPage = (type: PageType, key: string) => {
    if (type === "grid") {
      return (
        <div key={key} className="page choice-page">
          <div className="grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="portrait"
                onPointerDown={() => navigate("up")}
              >
                <span>Thumbnail {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div key={key} className="page video-page">
        <h1>Video Page</h1>
        <p style={{ color: "#aaa", fontSize: "14px" }}>
          Scroll down to choose next video
        </p>
      </div>
    );
  };

  return (
    <div
      style={{ backgroundColor: "#8C8C8C" }}
      className="app"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <TopBar />
      <div
        ref={sliderRef}
        className={`slider slider--${sliderPos}`}
      >
        {renderPage(slots[0], "top")}
        {renderPage(slots[1], "mid")}
        {renderPage(slots[2], "bot")}
      </div>
    </div>
  );
}

export default App;