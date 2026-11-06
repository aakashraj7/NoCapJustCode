// client/src/components/Scene/Hardware/Mouse.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function Mouse({
  width = 56,
  height = 80,
  color = THEME.orange,
  opacity = THEME.bigPieceOpacity,
  floatVariant = 'B',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const primary = hexToRgba(color, opacity);
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
        viewBox="0 0 56 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ergonomic Contour Body - Pure Line Art */}
        <path
          d="M 14 18 Q 28 8 42 18 Q 48 30 48 54 Q 48 72 28 72 Q 8 72 8 54 Q 8 30 14 18 Z"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />
        {/* Left/Right Button Seam */}
        <line x1="28" y1="12" x2="28" y2="34" stroke={primary} strokeWidth="1.4" />
        <path d="M 12 34 Q 28 36 44 34" stroke={creamFaint} strokeWidth="1.2" />

        {/* Textured Scroll Wheel in Accent */}
        <rect
          x="25.5"
          y="18"
          width="5"
          height="12"
          rx="2"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
        />
        <line x1="26" y1="21" x2="30" y2="21" stroke={accent} strokeWidth="1" />
        <line x1="26" y1="24" x2="30" y2="24" stroke={accent} strokeWidth="1" />
        <line x1="26" y1="27" x2="30" y2="27" stroke={accent} strokeWidth="1" />

        {/* Thumb Grip Texture */}
        <line x1="12" y1="46" x2="12" y2="58" stroke={cream} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="15" y1="49" x2="15" y2="55" stroke={cream} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
