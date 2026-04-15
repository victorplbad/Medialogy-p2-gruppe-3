// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
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

    //  COMMENT state
    const [commentActive, setCommentActive] = useState(false);

    const [animateLike, setAnimateLike] = useState(false);
    const [animateDislike, setAnimateDislike] = useState(false);

    //  COMMENT animation
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

    //  COMMENT handler
    const handleComment = () => {
        setCommentActive(!commentActive);

        setAnimateComment(true);
        setTimeout(() => setAnimateComment(false), 200);

        onComment?.();
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>

                {/*  LIKE */}
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

                {/*  COMMENT */}
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

                {/*  DISLIKE */}
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