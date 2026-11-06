// client/src/components/Scene/Hardware/UsbDrive.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

export default function UsbDrive({
  width = 75,
  height = 36,
  floatVariant = 'C',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const cream = `rgba(247, 237, 216, ${OPACITY.strokeStandard})`;
  const creamFaint = `rgba(247, 237, 216, ${OPACITY.strokeStandard * 0.7})`;
  const orange = `rgba(242, 107, 58, ${OPACITY.accent})`;
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
          fill="none"
          stroke={cream}
          strokeWidth="1.5"
        />
        {/* 2 Inner Contact Holes */}
        <rect x="10" y="14" width="3" height="3" fill="none" stroke={creamFaint} strokeWidth="1" />
        <rect x="10" y="19" width="3" height="3" fill="none" stroke={creamFaint} strokeWidth="1" />
        <line x1="16" y1="13" x2="16" y2="23" stroke={creamFaint} strokeWidth="1" />

        {/* Plastic Case Body - Pure Line Art */}
        <path
          d="M 24 8 L 60 8 Q 68 8 68 18 Q 68 28 60 28 L 24 28 Z"
          fill={fillCream}
          stroke={cream}
          strokeWidth="1.6"
        />

        {/* Lanyard Loop Hole */}
        <circle cx="61" cy="18" r="3" stroke={cream} strokeWidth="1.3" fill="none" />

        {/* Orange Activity LED */}
        <circle cx="34" cy="18" r="2" fill={orange} />
        <line x1="39" y1="18" x2="52" y2="18" stroke={creamFaint} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
