// client/src/components/Scene/Hardware/MotherboardFragment.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function MotherboardFragment({
  width = 110,
  height = 110,
  color = THEME.orange,
  opacity = THEME.bigPieceOpacity,
  floatVariant = 'C',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const primary = hexToRgba(color, opacity);
  const cream = hexToRgba(THEME.cream, THEME.creamDetailOpacity);
  const creamFaint = hexToRgba(THEME.cream, THEME.creamDetailOpacity * 0.7);
  const accent = hexToRgba(color, Math.min(opacity + 0.08, 0.24));
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
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* PCB Board Tile - Pure Line Art */}
        <rect
          x="8"
          y="8"
          width="94"
          height="94"
          rx="8"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />

        {/* Orthogonal 45° and 90° PCB Traces */}
        <path d="M 8 30 L 32 30 L 46 44 L 84 44" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <path d="M 8 36 L 30 36 L 42 48 L 74 48" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <path d="M 8 42 L 28 42 L 38 52 L 64 52" stroke={creamFaint} strokeWidth="1.3" fill="none" />

        <path d="M 44 8 L 44 26 L 56 38 L 88 38 L 88 78" stroke={accent} strokeWidth="1.5" fill="none" />
        <path d="M 52 8 L 52 22 L 62 32 L 96 32" stroke={creamFaint} strokeWidth="1.3" fill="none" />

        <path d="M 24 102 L 24 76 L 38 62 L 72 62" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <path d="M 30 102 L 30 80 L 42 68 L 82 68" stroke={gold} strokeWidth="1.4" fill="none" />

        {/* Solid Capacitors (3 cylindrical cans) */}
        <circle cx="86" cy="22" r="6" stroke={primary} strokeWidth="1.6" fill="none" />
        <circle cx="86" cy="22" r="3" stroke={accent} strokeWidth="1.2" fill="none" />

        <circle cx="86" cy="38" r="6" stroke={primary} strokeWidth="1.6" fill="none" />
        <circle cx="86" cy="38" r="3" stroke={accent} strokeWidth="1.2" fill="none" />

        <circle cx="86" cy="54" r="6" stroke={primary} strokeWidth="1.6" fill="none" />
        <circle cx="86" cy="54" r="3" stroke={accent} strokeWidth="1.2" fill="none" />

        {/* Ceramic SMD Resistors */}
        <rect x="36" y="22" width="6" height="3" rx="0.5" fill="none" stroke={cream} strokeWidth="1" />
        <rect x="48" y="22" width="6" height="3" rx="0.5" fill="none" stroke={cream} strokeWidth="1" />
        <rect x="60" y="22" width="6" height="3" rx="0.5" fill="none" stroke={cream} strokeWidth="1" />
      </svg>
    </div>
  );
}
