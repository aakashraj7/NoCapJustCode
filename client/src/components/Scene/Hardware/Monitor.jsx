// client/src/components/Scene/Hardware/Monitor.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function Monitor({
  width = 185,
  height = 145,
  color = THEME.yellow,
  opacity = THEME.bigPieceOpacity,
  floatVariant = 'A',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const primary = hexToRgba(color, opacity);
  const primaryFaint = hexToRgba(color, opacity * 0.75);
  const cream = hexToRgba(THEME.cream, THEME.creamDetailOpacity);
  const creamFaint = hexToRgba(THEME.cream, THEME.creamDetailOpacity * 0.7);
  const accent = hexToRgba(color, Math.min(opacity + 0.08, 0.24));

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
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />

        {/* Inner Screen Display */}
        <rect
          x="18"
          y="18"
          width="149"
          height="84"
          rx="4"
          fill="none"
          stroke={primaryFaint}
          strokeWidth="1.4"
        />

        {/* Terminal Header Bar */}
        <line x1="18" y1="32" x2="167" y2="32" stroke={primaryFaint} strokeWidth="1" />
        <circle cx="26" cy="25" r="2" fill="none" stroke={accent} strokeWidth="1.2" />
        <circle cx="33" cy="25" r="2" stroke={creamFaint} strokeWidth="1" fill="none" />
        <circle cx="40" cy="25" r="2" stroke={creamFaint} strokeWidth="1" fill="none" />

        {/* Terminal Content: Prompt & code lines */}
        <path d="M 28 44 L 32 47 L 28 50" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="38" y1="47" x2="95" y2="47" stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="28" y1="62" x2="120" y2="62" stroke={creamFaint} strokeWidth="1.6" strokeLinecap="round" />
        <rect x="28" y="72" width="5" height="8" fill="none" stroke={accent} strokeWidth="1.5" className={styles.cursor} />

        {/* Monitor Stand Vertical Neck */}
        <rect x="86" y="110" width="13" height="20" rx="2" fill="none" stroke={primary} strokeWidth="1.8" />

        {/* Stand Baseplate */}
        <ellipse cx="92.5" cy="133" rx="36" ry="6" fill="none" stroke={primary} strokeWidth="2.2" />
      </svg>
    </div>
  );
}
