// client/src/components/Scene/Hardware/Keyboard.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function Keyboard({
  width = 200,
  height = 75,
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
        viewBox="0 0 200 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chassis Frame - Pure Line Art */}
        <rect
          x="6"
          y="6"
          width="188"
          height="63"
          rx="8"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />

        {/* Row 1 Keys (Esc, Q..P, Backspace) */}
        <rect x="14" y="13" width="12" height="9" rx="2" fill="none" stroke={accent} strokeWidth="1.4" />
        <rect x="30" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="45" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="60" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="75" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="90" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="105" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="120" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="135" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="150" y="13" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="165" y="13" width="20" height="9" rx="2" fill="none" stroke={cream} strokeWidth="1.4" />

        {/* Row 2 Keys (Tab, A..L, Enter) */}
        <rect x="14" y="25" width="16" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="34" y="25" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="49" y="25" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="64" y="25" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="79" y="25" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="94" y="25" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="109" y="25" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="124" y="25" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="139" y="25" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="154" y="25" width="31" height="9" rx="2" fill="none" stroke={accent} strokeWidth="1.4" />

        {/* Row 3 Keys (Shift, Z..M, Shift) */}
        <rect x="14" y="37" width="22" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="40" y="37" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="55" y="37" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="70" y="37" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="85" y="37" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="100" y="37" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="115" y="37" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="130" y="37" width="11" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />
        <rect x="145" y="37" width="40" height="9" rx="2" fill="none" stroke={primaryFaint} strokeWidth="1.2" />

        {/* Row 4 Bottom Modifiers & Spacebar */}
        <rect x="14" y="49" width="14" height="11" rx="2" fill="none" stroke={cream} strokeWidth="1.2" />
        <rect x="32" y="49" width="13" height="11" rx="2" fill="none" stroke={cream} strokeWidth="1.2" />
        <rect x="49" y="49" width="14" height="11" rx="2" fill="none" stroke={cream} strokeWidth="1.2" />
        {/* Spacebar */}
        <rect x="67" y="49" width="68" height="11" rx="2" fill="none" stroke={primary} strokeWidth="1.6" />
        <rect x="139" y="49" width="14" height="11" rx="2" fill="none" stroke={cream} strokeWidth="1.2" />
        <rect x="157" y="49" width="13" height="11" rx="2" fill="none" stroke={cream} strokeWidth="1.2" />
        <rect x="174" y="49" width="11" height="11" rx="2" fill="none" stroke={cream} strokeWidth="1.2" />
      </svg>
    </div>
  );
}
