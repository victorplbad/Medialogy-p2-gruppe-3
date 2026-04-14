// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { useRef } from 'react';
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Gruppe 3 P2</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

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
                <TopBar/>
                <div id="settings" className="menuItem remove">
                    <h1>PUT SETTINGS HERE</h1>
                </div>
                <div id="stats" className="menuItem">
                    <h1>PUT STATS HERE</h1>
                    I Stole googles AI search image and you can't stop me(im pretty sure its public since it links to W3.org)
                    <div/>
                    Which does explain why *every* web page uses the same image for ai functions
                </div>
                <div id="home" className="menuItem remove">
                    <h1>PUT HOME/SEARCH HERE</h1>
                </div>
            </div>
        </div>
    )
}

function switchMenu(ID: string) {
    if (ID === "settings") {
        document.getElementById("searchbar")?.classList.add("hide");
    } else {
        document.getElementById("searchbar")?.classList.remove("hide");
    }
    const elements = Array.from(document.getElementsByClassName("menuItem"));
    for (const e of elements) {
        e.classList.add("remove");
    }
    document.getElementById(ID)?.classList.remove("remove");
}

function TopBar() {
    return (
        <div className="topBar">
            <button className="button" onClick={() => switchMenu("settings")}>Settings</button>
            <button className="button" onClick={() => switchMenu("stats")}>Stats</button>
            <button className="button" onClick={() => switchMenu("home")}>Home</button>
            <SearchField/>
            <button className="button" onClick={() => overlayHide()}>Close overlay</button>
        </div>
    )
}

function SearchField() {
    return (/*I hate this so much... there has to be a better way to have events on text fields*/
        <div id="searchbar" className="textfield_div">
            <input type="text" placeholder="Search." onKeyDown={(event) => {
                if (event.key === "Enter") {
                    /*Do a Search*/
                    alert(event.currentTarget.value);
                } else {
                    /*Suggest search terms?*/
                }
            }
            }></input>
            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M17.5 12c0-3.04 2.46-5.5 5.5-5.5-3.04 0-5.5-2.46-5.5-5.5 0 3.04-2.46 5.5-5.5 5.5 3.04 0 5.5 2.46 5.5 5.5z"></path><path d="M15.65 11.58c.18-.5.27-1.03.31-1.58h-2c-.1 1.03-.51 1.93-1.27 2.69-.88.87-1.94 1.31-3.19 1.31C7.03 14 5 12.07 5 9.5 5 7.03 6.93 5 9.5 5c.46 0 .89.08 1.3.2l1.56-1.56C11.5 3.22 10.55 3 9.5 3 5.85 3 3 5.85 3 9.5S5.85 16 9.5 16c.56 0 2.26-.06 3.8-1.3l6.3 6.3 1.4-1.4-6.3-6.3c.4-.5.72-1.08.95-1.72z"></path></g></g></svg>
        </div>
    )
}

function overlayToggle() {
    const overlay = document.getElementsByClassName("overlay")[0];
    if (overlay.classList.contains("show")) overlayHide();
    else overlayShow();
}

function overlayShow() {
    document.getElementsByClassName("overlay")[0].classList.add("show");
    document.getElementsByClassName("weirdButton")[0].innerHTML = "Close overlay";
}

function overlayHide() {
    document.getElementsByClassName("overlay")[0].classList.remove("show");
    document.getElementsByClassName("weirdButton")[0].innerHTML = "Open overlay";
}

export default App