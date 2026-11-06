// client/src/components/Scene/Hardware/RamStick.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function RamStick({
  width = 175,
  height = 50,
  color = THEME.orange,
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
        viewBox="0 0 175 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* PCB Board Contour with Clip Notches - Pure Line Art */}
        <path
          d="M 12 10 L 163 10 Q 168 10 168 15 L 168 22 L 164 24 L 168 26 L 168 38 L 12 38 L 12 26 L 8 24 L 12 22 L 12 15 Q 12 10 12 10 Z"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />

        {/* 6 DRAM Memory BGA Chips */}
        {[20, 42, 64, 90, 112, 134].map((x, i) => (
          <g key={i}>
            <rect
              x={x}
              y="16"
              width="17"
              height="16"
              rx="2"
              fill="none"
              stroke={primaryFaint}
              strokeWidth="1.3"
            />
            <circle cx={x + 3} cy="19" r="0.8" fill="none" stroke={creamFaint} strokeWidth="0.8" />
            <line x1={x + 4} y1="24" x2={x + 13} y2="24" stroke={creamFaint} strokeWidth="1" />
          </g>
        ))}

        {/* SPD EEPROM tiny chip */}
        <rect x="79" y="19" width="6" height="10" rx="1" fill="none" stroke={cream} strokeWidth="1" />

        {/* Gold Contacts / Edge Connector Finger Pins */}
        {/* Left bank (50 pins representation) */}
        <line
          x1="16"
          y1="41"
          x2="80"
          y2="41"
          stroke={gold}
          strokeWidth="4"
          strokeDasharray="2 1.5"
        />
        {/* Key Notch separator at x=83 */}
        {/* Right bank (60 pins representation) */}
        <line
          x1="86"
          y1="41"
          x2="164"
          y2="41"
          stroke={gold}
          strokeWidth="4"
          strokeDasharray="2 1.5"
        />
      </svg>
    </div>
  );
}
