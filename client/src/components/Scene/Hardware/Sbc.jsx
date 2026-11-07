// client/src/components/Scene/Hardware/Sbc.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function Sbc({
  width = 125,
  height = 85,
  color = THEME.yellow,
  opacity = THEME.bigPieceOpacity,
  floatVariant = 'B',
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
        viewBox="0 0 125 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* PCB Board Contour with 4 Mounting Holes - Pure Line Art */}
        <rect
          x="8"
          y="8"
          width="109"
          height="69"
          rx="7"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />
        <circle cx="15" cy="15" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />
        <circle cx="110" cy="15" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />
        <circle cx="15" cy="70" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />
        <circle cx="110" cy="70" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />

        {/* 40-Pin GPIO Header (2x20 pins on top edge) */}
        <rect x="22" y="12" width="60" height="9" rx="1.5" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        {[...Array(18)].map((_, i) => (
          <g key={i}>
            <circle cx={25 + i * 3.2} cy="14.5" r="0.75" fill="none" stroke={gold} strokeWidth="0.8" />
            <circle cx={25 + i * 3.2} cy="18.5" r="0.75" fill="none" stroke={gold} strokeWidth="0.8" />
          </g>
        ))}

        {/* SoC Processor Chip */}
        <rect x="42" y="32" width="28" height="28" rx="3" fill="none" stroke={primary} strokeWidth="1.8" />
        <rect x="46" y="36" width="20" height="20" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1" />
        <circle cx="56" cy="46" r="2" fill="none" stroke={accent} strokeWidth="1.2" />

        {/* Ethernet RJ45 Jack */}
        <rect x="94" y="24" width="24" height="22" rx="2" fill="none" stroke={primary} strokeWidth="1.6" />
        <line x1="94" y1="35" x2="104" y2="35" stroke={creamFaint} strokeWidth="1" />

        {/* Dual USB Type-A Stacks */}
        <rect x="94" y="50" width="24" height="18" rx="2" fill="none" stroke={primary} strokeWidth="1.6" />
        <line x1="94" y1="59" x2="114" y2="59" stroke={primaryFaint} strokeWidth="1.2" />

        {/* USB-C Power Jack on Bottom Left */}
        <rect x="18" y="73" width="14" height="6" rx="2" fill="none" stroke={cream} strokeWidth="1.4" />
      </svg>
    </div>
  );
}
