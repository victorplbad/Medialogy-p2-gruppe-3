// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './giga.css'
import React from "react"; // React gør det muligt at bruge React-komponenter

type Comment = {
    id: number; // et tal
    text: string; // en tekst
};

// Her laves en array for comment som viser de forskellige kommentarer fra panelet
const comments: Comment[] = [
    { id: 1, text: "Comment" },
    { id: 2, text: "Comment" },
    { id: 3, text: "Comment" },
    { id: 4, text: "Comment" },
    { id: 5, text: "Comment" },
    { id: 6, text: "Comment" },
];

// Her laver vi en React komponent: React.FC = Functional Component
const Comments: React.FC = () => {
    /* det der vises på skærmen, Alt UI ligger inde i return
      div = en “boks”, className = CSS klasse (i stedet for class) */
    return (
        <div className="container">

            {/* Video section */}
            <div className="video-section">
                <div className="video-overlay">
                    <div className="channel">@ChannelName</div>
                    <div className="title">VideoTitle #hashtag</div>
                </div>
            </div>

            {/* Divider, lille streg til drag down eller up */}
            <div className="divider" />

            {/* Comments, map går igennem alle kommentarer */}
            <div className="comments">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="avatar" />
                        <span>{comment.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;