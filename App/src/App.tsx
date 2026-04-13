// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
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
import React, { useState } from "react";
import { ThumbsUp, MessageCircle, ThumbsDown } from "lucide-react";

type BottomPanelProps = {
  onLike?: () => void;     // Funktion der kaldes når man liker
  onComment?: () => void;  // Funktion der kaldes når man trykker på kommentar-knappen
  onDislike?: () => void;  // Funktion der kaldes når man disliker
};

const BottomPanel: React.FC<BottomPanelProps> = ({
  onLike,
  onComment,
  onDislike,
}) => {

  // 🔘 Om brugeren har trykket LIKE
  const [liked, setLiked] = useState(false);

  // 👎 Om brugeren har trykket DISLIKE
  const [disliked, setDisliked] = useState(false);

  // 🎞 Bruges til at lave en lille "pop" animation når man liker
  const [animateLike, setAnimateLike] = useState(false);

  // 🎞 Bruges til at lave en lille "pop" animation når man disliker
  const [animateDislike, setAnimateDislike] = useState(false);

  // 👍 Når man trykker LIKE
  const handleLike = () => {
    setLiked(!liked); // Skift liked fra true → false eller omvendt

    if (disliked) setDisliked(false); // Hvis man havde disliked før → fjern dislike

    // Start animation
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 200);

    // Kald ekstern callback hvis den findes
    onLike?.();
  };

  // 👎 Når man trykker DISLIKE
  const handleDislike = () => {
    setDisliked(!disliked); // Skift disliked fra true → false eller omvendt

    if (liked) setLiked(false); // Hvis man havde liket før → fjern like

    // Start animation
    setAnimateDislike(true);
    setTimeout(() => setAnimateDislike(false), 200);

    // Kald ekstern callback hvis den findes
    onDislike?.();
  };

  return (
    <div style={styles.wrapper}> {/* Hele bundpanelet */}
      <div style={styles.container}> {/* Boksen med de tre knapper */}

        {/* 👍 LIKE KNAP */}
        <button style={styles.button} onClick={handleLike}>
          <div
            style={{
              ...styles.iconWrapper,
              transform: animateLike ? "scale(1.3)" : "scale(1)", // Animation hvis aktiv
            }}
          >
            <ThumbsUp
              size={26}
              color={liked ? "#4ade80" : "#1E1E1E"} // Grøn hvis liked
            />
          </div>
        </button>

        {/* 💬 COMMENT KNAP */}
        <button style={styles.button} onClick={onComment}>
          <MessageCircle size={26} /> {/* Kun ikon, ingen tal */}
        </button>

        {/* 👎 DISLIKE KNAP */}
        <button style={styles.button} onClick={handleDislike}>
          <div
            style={{
              ...styles.iconWrapper,
              transform: animateDislike ? "scale(1.3)" : "scale(1)", // Animation hvis aktiv
            }}
          >
            <ThumbsDown
              size={26}
              color={disliked ? "#f87171" : "#1E1E1E"} // Rød hvis disliked
            />
          </div>
        </button>

      </div>
    </div>
  );
};

export default BottomPanel;

// 🎨 Styling til hele bundpanelet
const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    position: "fixed", // Panelet sidder fast i bunden
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "10px 0",
  },
  container: {
    width: "90%",
    maxWidth: "500px",
    height: "65px",
    backgroundColor: "#555555",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-around", // Fordeler knapperne
    alignItems: "center",
    boxShadow: "0px -2px 10px rgba(0,0,0,0.4)", // Let skygge
  },
  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#1E1E1E",
    display: "flex",
    flexDirection: "column", // Ikon centreret
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  },
  iconWrapper: {
    transition: "transform 0.2s ease", // Smooth animation
  },
};
