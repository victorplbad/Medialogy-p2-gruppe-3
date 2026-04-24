// SideWave.tsx
import React from 'react';
import './SideWave.css';

interface SideWaveProps {
  side: 'left' | 'right';
}

const SideWave: React.FC<SideWaveProps> = ({ side }) => {
  return (
    <div className={`wave-container ${side}`}>
      <svg
        className="wave-svg"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <path
          className="wave-path"
          d="M0,0 
             C50,200 50,300 0,500 
             C50,700 50,800 0,1000 
             L0,1000 L0,0 Z"
        />
        {/* Secondary wave for depth */}
        <path
          className="wave-path-delayed"
          d="M0,0 
             C30,150 30,350 0,500 
             C30,650 30,850 0,1000 
             L0,1000 L0,0 Z"
        />
      </svg>
    </div>
  );
};

export default SideWave;