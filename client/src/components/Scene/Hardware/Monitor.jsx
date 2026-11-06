// client/src/components/Scene/Hardware/Monitor.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

export default function Monitor({
  width = 185,
  height = 145,
  floatVariant = 'A',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const cream = `rgba(247, 237, 216, ${OPACITY.strokeStandard})`;
  const creamFaint = `rgba(247, 237, 216, ${OPACITY.strokeStandard * 0.7})`;
  const orange = `rgba(242, 107, 58, ${OPACITY.accent})`;
  const green = `rgba(74, 222, 128, ${OPACITY.accent})`;
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
        viewBox="0 0 185 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Monitor Screen Frame - Pure Line Art */}
        <rect
          x="10"
          y="10"
          width="165"
          height="100"
          rx="8"
          fill={fillCream}
          stroke={cream}
          strokeWidth="1.8"
        />

        {/* Inner Screen Display */}
        <rect
          x="18"
          y="18"
          width="149"
          height="84"
          rx="4"
          fill="none"
          stroke={creamFaint}
          strokeWidth="1.2"
        />

        {/* Terminal Header Bar */}
        <line x1="18" y1="32" x2="167" y2="32" stroke={creamFaint} strokeWidth="1" />
        <circle cx="26" cy="25" r="2" fill={orange} />
        <circle cx="33" cy="25" r="2" stroke={creamFaint} strokeWidth="1" />
        <circle cx="40" cy="25" r="2" stroke={creamFaint} strokeWidth="1" />

        {/* Terminal Content: $ run tests */}
        <path d="M 28 44 L 32 47 L 28 50" stroke={orange} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text
          x="38"
          y="49"
          fill={cream}
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          run tests
        </text>

        {/* Terminal Content: passed 12/12 */}
        <path d="M 28 64 L 31 67 L 36 61" stroke={green} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text
          x="40"
          y="66"
          fill={cream}
          fontSize="8"
          fontFamily="monospace"
          fontWeight="500"
        >
          passed 12/12
        </text>

        {/* Blinking Prompt Cursor */}
        <rect x="28" y="74" width="5" height="8" fill={orange} className={styles.cursor} />

        {/* Monitor Stand Vertical Neck */}
        <rect x="86" y="110" width="13" height="20" rx="2" fill={fillCream} stroke={cream} strokeWidth="1.6" />

        {/* Stand Baseplate */}
        <ellipse cx="92.5" cy="133" rx="36" ry="6" fill={fillCream} stroke={cream} strokeWidth="1.8" />
      </svg>
    </div>
  );
}
