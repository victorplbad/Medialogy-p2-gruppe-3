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

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // 🆕 COMMENT state
  const [commentActive, setCommentActive] = useState(false);

  const [animateLike, setAnimateLike] = useState(false);
  const [animateDislike, setAnimateDislike] = useState(false);

  // 🆕 COMMENT animation
  const [animateComment, setAnimateComment] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);

    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 200);

    onLike?.();
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);

    setAnimateDislike(true);
    setTimeout(() => setAnimateDislike(false), 200);

    onDislike?.();
  };

  // 🆕 COMMENT handler
  const handleComment = () => {
    setCommentActive(!commentActive);

    setAnimateComment(true);
    setTimeout(() => setAnimateComment(false), 200);

    onComment?.();
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
              color={liked ? "#ebf2ee" : "#1E1E1E"}
            />
          </div>
        </button>

        {/* 💬 COMMENT */}
        <button style={styles.button} onClick={handleComment}>
          <div
            style={{
              ...styles.iconWrapper,
              transform: animateComment ? "scale(1.3)" : "scale(1)",
            }}
          >
            <MessageCircle
              size={26}
              color={commentActive ? "#e0f0ff" : "#1E1E1E"} // blå når aktiv
            />
          </div>
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
              color={disliked ? "#f7f2f2" : "#1E1E1E"}
            />
          </div>
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
  },
  container: {
    width: "90%",
    maxWidth: "500px",
    height: "65px",
    backgroundColor: "#555555",
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
    color: "#1E1E1E",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  },
  iconWrapper: {
    transition: "transform 0.2s ease",
  },
};