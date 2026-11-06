// client/src/components/Scene/Hardware/UsbDrive.jsx
import React from 'react';
import styles from './Hardware.module.css';

export default function UsbDrive({
  width = 75,
  height = 36,
  floatVariant = 'C',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const cream = 'rgba(247, 237, 216, 0.85)';
  const creamFaint = 'rgba(247, 237, 216, 0.35)';
  const orange = '#F26B3A';
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
        viewBox="0 0 75 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Metal USB Plug on Left */}
        <rect
          x="6"
          y="11"
          width="18"
          height="14"
          rx="2"
          fill="rgba(30, 30, 38, 0.95)"
          stroke={cream}
          strokeWidth="1.6"
        />
        {/* 2 Inner Contact Holes */}
        <rect x="10" y="14" width="3" height="3" fill={creamFaint} />
        <rect x="10" y="19" width="3" height="3" fill={creamFaint} />
        <line x1="16" y1="13" x2="16" y2="23" stroke={creamFaint} strokeWidth="1" />

        {/* Plastic Case Body */}
        <path
          d="M 24 8 L 60 8 Q 68 8 68 18 Q 68 28 60 28 L 24 28 Z"
          fill={fillDark}
          stroke={cream}
          strokeWidth="1.8"
        />

        {/* Lanyard Loop Hole */}
        <circle cx="61" cy="18" r="3" stroke={cream} strokeWidth="1.4" fill="none" />

        {/* Orange Activity LED */}
        <circle cx="34" cy="18" r="2" fill={orange} />
        <line x1="39" y1="18" x2="52" y2="18" stroke={creamFaint} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
