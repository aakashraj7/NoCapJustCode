// client/src/components/Scene/Hardware/CaseFan.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function CaseFan({
  width = 85,
  height = 85,
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
  const accent = hexToRgba(color, Math.min(opacity + 0.08, 0.24));

  const blades = [];
  const cx = 42.5;
  const cy = 42.5;
  const r = 30;

  for (let i = 0; i < 9; i++) {
    const angle = (i * 360) / 9;
    const rad = (angle * Math.PI) / 180;
    const x2 = cx + Math.cos(rad) * (r - 2);
    const y2 = cy + Math.sin(rad) * (r - 2);
    const radCurve = ((angle + 28) * Math.PI) / 180;
    const cxCurv = cx + Math.cos(radCurve) * (r / 1.8);
    const cyCurv = cy + Math.sin(radCurve) * (r / 1.8);
    blades.push(
      <path
        key={i}
        d={`M ${cx} ${cy} Q ${cxCurv} ${cyCurv} ${x2} ${y2}`}
        stroke={primaryFaint}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    );
  }

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
        viewBox="0 0 85 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Square Housing Frame with Rounded Corners - Pure Line Art */}
        <rect
          x="6"
          y="6"
          width="73"
          height="73"
          rx="10"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />

        {/* 4 Corner Screw Holes */}
        <circle cx="14" cy="14" r="3" stroke={cream} strokeWidth="1.3" fill="none" />
        <circle cx="71" cy="14" r="3" stroke={cream} strokeWidth="1.3" fill="none" />
        <circle cx="14" cy="71" r="3" stroke={cream} strokeWidth="1.3" fill="none" />
        <circle cx="71" cy="71" r="3" stroke={cream} strokeWidth="1.3" fill="none" />

        {/* Circular Fan Cowling Duct */}
        <circle cx="42.5" cy="42.5" r="31" stroke={primary} strokeWidth="1.8" fill="none" />

        {/* Rotating 9 Aerofoil Blades + Center Hub */}
        <g className={styles.fanBlades}>
          {blades}
          <circle cx="42.5" cy="42.5" r="11" fill="none" stroke={accent} strokeWidth="1.8" />
          <circle cx="42.5" cy="42.5" r="4" fill="none" stroke={accent} strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}
