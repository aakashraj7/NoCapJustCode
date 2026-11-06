// client/src/components/Scene/Hardware/M2Ssd.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function M2Ssd({
  width = 135,
  height = 42,
  color = THEME.yellow,
  opacity = THEME.bigPieceOpacity,
  floatVariant = 'C',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const primary = hexToRgba(color, opacity);
  const primaryFaint = hexToRgba(color, opacity * 0.75);
  const cream = hexToRgba(THEME.cream, THEME.creamDetailOpacity);
  const creamFaint = hexToRgba(THEME.cream, THEME.creamDetailOpacity * 0.7);
  const gold = hexToRgba(THEME.yellow, Math.min(opacity + 0.08, 0.24));

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
        viewBox="0 0 135 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* PCB Board Outline with Rear Screw Notch - Pure Line Art */}
        <path
          d="M 12 8 L 126 8 L 126 16 L 131 16 L 131 26 L 126 26 L 126 34 L 12 34 Q 6 34 6 28 L 6 24 C 9 24 11 22.5 11 21 C 11 19.5 9 18 6 18 L 6 14 Q 6 8 12 8 Z"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />

        {/* Semi-circular mounting screw hole pad */}
        <circle cx="8" cy="21" r="3" stroke={cream} strokeWidth="1.3" fill="none" />

        {/* 3 Rectangular NAND Flash Storage Chips */}
        {[20, 48, 76].map((x, i) => (
          <g key={i}>
            <rect
              x={x}
              y="12"
              width="24"
              height="18"
              rx="2"
              fill="none"
              stroke={primaryFaint}
              strokeWidth="1.3"
            />
            <circle cx={x + 3} cy="15" r="0.8" fill="none" stroke={creamFaint} strokeWidth="0.8" />
            <line x1={x + 4} y1="21" x2={x + 20} y2="21" stroke={creamFaint} strokeWidth="1" />
          </g>
        ))}

        {/* NVMe Controller Chip */}
        <rect
          x="104"
          y="13"
          width="16"
          height="16"
          rx="2"
          fill="none"
          stroke={primary}
          strokeWidth="1.6"
        />
        <circle cx="112" cy="21" r="2" fill="none" stroke={gold} strokeWidth="1.2" />

        {/* M.2 Key Notch & Gold Pins at Right Edge */}
        <line x1="128" y1="11" x2="128" y2="15" stroke={gold} strokeWidth="2.5" />
        <line x1="128" y1="27" x2="128" y2="31" stroke={gold} strokeWidth="2.5" />
      </svg>
    </div>
  );
}
