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
  onLike?: () => void;
  onComment?: () => void;
  onDislike?: () => void;
};

const BottomPanel: React.FC<BottomPanelProps> = ({
  onLike,
  onComment,
  onDislike,
}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [animateLike, setAnimateLike] = useState(false);
  const [animateDislike, setAnimateDislike] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setLiked(true);

      // hvis man havde disliked før → fjern den
      if (disliked) {
        setDislikes((prev) => prev - 1);
        setDisliked(false);
      }
    }

    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 200);

    onLike?.();
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes((prev) => prev - 1);
      setDisliked(false);
    } else {
      setDislikes((prev) => prev + 1);
      setDisliked(true);

      // hvis man havde liked før → fjern den
      if (liked) {
        setLikes((prev) => prev - 1);
        setLiked(false);
      }
    }

    setAnimateDislike(true);
    setTimeout(() => setAnimateDislike(false), 200);

    onDislike?.();
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* 👍 LIKE */}
        <button style={styles.button} onClick={handleLike}>
          <div
            style={{
              ...styles.iconWrapper,
              transform: animateLike ? "scale(1.3)" : "scale(1)",
            }}
          >
            <ThumbsUp
              size={26}
              color={liked ? "#4ade80" : "#bfbfbf"}
            />
          </div>
          <span style={styles.text}>{likes}</span>
        </button>

        {/* 💬 COMMENT */}
        <button style={styles.button} onClick={onComment}>
          <MessageCircle size={26} />
          <span style={styles.text}>0</span>
        </button>

        {/* 👎 DISLIKE */}
        <button style={styles.button} onClick={handleDislike}>
          <div
            style={{
              ...styles.iconWrapper,
              transform: animateDislike ? "scale(1.3)" : "scale(1)",
            }}
          >
            <ThumbsDown
              size={26}
              color={disliked ? "#f87171" : "#bfbfbf"} // rød når disliked
            />
          </div>
          <span style={styles.text}>{dislikes}</span>
        </button>

      </div>
    </div>
  );
};

export default BottomPanel;
const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "10px 0",
    background: "linear-gradient(to top, #1f1f1f, transparent)",
  },
  container: {
    width: "90%",
    maxWidth: "500px",
    height: "65px",
    backgroundColor: "#2b2b2b",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    boxShadow: "0px -2px 10px rgba(0,0,0,0.4)",
  },
  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#bfbfbf",
    display: "flex",
    flexDirection: "column", // 👈 ikon + tekst under
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  },
  iconWrapper: {
    transition: "transform 0.2s ease",
  },
  text: {
    fontSize: "12px",
    color: "#ccc",
  },
};

