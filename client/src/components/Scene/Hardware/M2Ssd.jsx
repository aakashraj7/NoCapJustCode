// client/src/components/Scene/Hardware/M2Ssd.jsx
import React from 'react';
import styles from './Hardware.module.css';

export default function M2Ssd({
  width = 135,
  height = 42,
  floatVariant = 'C',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const cream = 'rgba(247, 237, 216, 0.85)';
  const creamFaint = 'rgba(247, 237, 216, 0.35)';
  const orange = '#F26B3A';
  const yellow = '#F8BB3A';
  const fillDark = 'rgba(11, 11, 13, 0.9)';

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
        {/* PCB Board Outline with Rear Screw Notch */}
        <path
          d="M 12 8 L 126 8 L 126 16 L 131 16 L 131 26 L 126 26 L 126 34 L 12 34 Q 6 34 6 28 L 6 24 C 9 24 11 22.5 11 21 C 11 19.5 9 18 6 18 L 6 14 Q 6 8 12 8 Z"
          fill={fillDark}
          stroke={cream}
          strokeWidth="1.8"
        />

        {/* Semi-circular mounting screw hole pad */}
        <circle cx="8" cy="21" r="3" stroke={cream} strokeWidth="1.4" fill="none" />

        {/* 3 Rectangular NAND Flash Storage Chips */}
        {[20, 48, 76].map((x, i) => (
          <g key={i}>
            <rect
              x={x}
              y="12"
              width="24"
              height="18"
              rx="2"
              fill="rgba(18, 18, 24, 0.95)"
              stroke={cream}
              strokeWidth="1.3"
            />
            <circle cx={x + 3.5} cy="15.5" r="0.8" fill={creamFaint} />
            <line x1={x + 6} y1="21" x2={x + 18} y2="21" stroke={creamFaint} strokeWidth="1" />
          </g>
        ))}

        {/* Controller Chip in Orange Heat-Spreader Accent */}
        <rect
          x="104"
          y="13"
          width="16"
          height="16"
          rx="2"
          fill="rgba(242, 107, 58, 0.18)"
          stroke={orange}
          strokeWidth="1.6"
        />
        <circle cx="112" cy="21" r="2" fill={orange} />

        {/* Gold Connector Pins on right edge */}
        <line x1="128" y1="17" x2="128" y2="25" stroke={yellow} strokeWidth="2.5" strokeDasharray="2 1.5" />
      </svg>
    </div>
  );
}
