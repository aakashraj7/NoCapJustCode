// client/src/components/Scene/Hardware/Laptop.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

export default function Laptop({
  width = 240,
  height = 150,
  floatVariant = 'A',
  hasHalo = true,
  haloStrong = false,
  isHero = false,
  className = '',
  style = {},
}) {
  const strokeOp = isHero ? OPACITY.strokeHeroLaptop : OPACITY.strokeStandard;
  const cream = `rgba(247, 237, 216, ${strokeOp})`;
  const creamFaint = `rgba(247, 237, 216, ${strokeOp * 0.7})`;
  const creamDim = `rgba(247, 237, 216, ${strokeOp * 0.5})`;
  const orange = `rgba(242, 107, 58, ${OPACITY.accent})`;
  const yellow = `rgba(248, 187, 58, ${OPACITY.accent})`;
  const fillCream = OPACITY.fillCream;

  return (
    <div
      className={`${styles.hardwarePiece} ${styles['float' + floatVariant]} ${className}`}
      style={{ width, height, ...style }}
      aria-hidden="true"
    >
      {hasHalo && (
        <div className={`${styles.halo} ${haloStrong ? styles.haloStrong : ''}`} />
      )}
      <svg
        className={styles.pieceSvg}
        width={width}
        height={height}
        viewBox="0 0 240 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Open Screen Lid - Pure Line Art */}
        <rect
          x="30"
          y="10"
          width="180"
          height="106"
          rx="10"
          fill={fillCream}
          stroke={cream}
          strokeWidth="1.8"
        />
        <rect
          x="40"
          y="20"
          width="160"
          height="86"
          rx="5"
          fill="none"
          stroke={creamFaint}
          strokeWidth="1.2"
        />
        {/* Webcam */}
        <circle cx="120" cy="15" r="1.5" fill={cream} />

        {/* 6 Lines of Syntax-Colored Code */}
        {/* Line 1: orange keyword import */}
        <line x1="50" y1="34" x2="84" y2="34" stroke={orange} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="90" y1="34" x2="148" y2="34" stroke={cream} strokeWidth="1.6" strokeLinecap="round" />
        {/* Line 2: faint comment */}
        <line x1="50" y1="46" x2="135" y2="46" stroke={creamFaint} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="6 4" />
        {/* Line 3: cream function header */}
        <line x1="50" y1="58" x2="162" y2="58" stroke={cream} strokeWidth="1.6" strokeLinecap="round" />
        {/* Line 4: yellow condition */}
        <line x1="62" y1="70" x2="128" y2="70" stroke={yellow} strokeWidth="1.6" strokeLinecap="round" />
        {/* Line 5: orange bitwise expression */}
        <line x1="62" y1="82" x2="152" y2="82" stroke={orange} strokeWidth="1.8" strokeLinecap="round" />
        {/* Line 6: cream closing brace & blinking cursor */}
        <line x1="50" y1="94" x2="62" y2="94" stroke={cream} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="68" y1="90" x2="68" y2="98" stroke={orange} strokeWidth="2.2" className={styles.cursor} strokeLinecap="round" />

        {/* Hinge */}
        <line x1="88" y1="116" x2="152" y2="116" stroke={cream} strokeWidth="2.4" strokeLinecap="round" />

        {/* Keyboard Base Baseplate - Pure Line Art */}
        <path
          d="M 12 124 L 38 118 L 202 118 L 228 124 Q 234 126 226 134 L 210 142 Q 202 144 186 144 L 54 144 Q 38 144 30 142 L 14 134 Q 6 126 12 124 Z"
          fill={fillCream}
          stroke={cream}
          strokeWidth="1.8"
        />

        {/* Keyboard Keys Grid (subtle slit rows) */}
        <line x1="48" y1="124" x2="192" y2="124" stroke={creamDim} strokeWidth="1.2" strokeDasharray="8 4" />
        <line x1="44" y1="130" x2="196" y2="130" stroke={creamDim} strokeWidth="1.2" strokeDasharray="10 5" />

        {/* Trackpad */}
        <rect x="96" y="133" width="48" height="9" rx="2" fill="none" stroke={creamFaint} strokeWidth="1" />
        {/* Status LED */}
        <circle cx="120" cy="120" r="1.5" fill={orange} />
      </svg>
    </div>
  );
}
