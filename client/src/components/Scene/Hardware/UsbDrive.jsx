// client/src/components/Scene/Hardware/UsbDrive.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function UsbDrive({
  width = 75,
  height = 36,
  size,
  color = THEME.orange,
  opacity = THEME.smallPieceOpacity,
  floatVariant = 'C',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const finalWidth = size || width;
  const finalHeight = size ? Math.round(size * (36 / 75)) : height;
  const primary = hexToRgba(color, opacity);
  const primaryFaint = hexToRgba(color, opacity * 0.75);
  const cream = hexToRgba(THEME.cream, THEME.creamDetailOpacity);
  const creamFaint = hexToRgba(THEME.cream, THEME.creamDetailOpacity * 0.7);
  const accent = hexToRgba(color, Math.min(opacity + 0.08, 0.24));

  return (
    <div
      className={`${styles.hardwarePiece} ${styles['float' + floatVariant]} ${className}`}
      style={{ width: finalWidth, height: finalHeight, ...style }}
      aria-hidden="true"
    >
      {hasHalo && (
        <div className={`${styles.halo} ${haloStrong ? styles.haloStrong : ''}`} />
      )}
      <svg
        className={styles.pieceSvg}
        width={finalWidth}
        height={finalHeight}
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
          strokeWidth="1.6"
        />
        {/* 2 Inner Contact Holes */}
        <rect x="10" y="14" width="3" height="3" fill="none" stroke={creamFaint} strokeWidth="1" />
        <rect x="10" y="19" width="3" height="3" fill="none" stroke={creamFaint} strokeWidth="1" />
        <line x1="16" y1="13" x2="16" y2="23" stroke={creamFaint} strokeWidth="1" />

        {/* Plastic Case Body - Pure Line Art */}
        <path
          d="M 24 8 L 60 8 Q 68 8 68 18 Q 68 28 60 28 L 24 28 Z"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />

        {/* Activity Indicator LED */}
        <circle cx="56" cy="18" r="1.5" fill="none" stroke={accent} strokeWidth="1.2" />

        {/* Lanyard Hole Inset */}
        <ellipse cx="63" cy="18" rx="2" ry="4" stroke={primaryFaint} strokeWidth="1.2" fill="none" />
      </svg>
    </div>
  );
}
