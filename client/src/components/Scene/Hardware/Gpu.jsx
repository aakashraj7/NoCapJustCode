// client/src/components/Scene/Hardware/Gpu.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { THEME, hexToRgba } from '../hardwareConfig.js';

export default function Gpu({
  width = 220,
  height = 95,
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
  const creamFaint = hexToRgba(THEME.cream, THEME.creamDetailOpacity * 0.7);
  const accent = hexToRgba(color, Math.min(opacity + 0.08, 0.24));
  const gold = hexToRgba(THEME.yellow, Math.min(opacity + 0.08, 0.24));

  // Helper for 7 rotating fan blades in a circle
  const renderFan = (cx, cy, r = 24) => {
    const blades = [];
    for (let i = 0; i < 7; i++) {
      const angle = (i * 360) / 7;
      const rad = (angle * Math.PI) / 180;
      const x2 = cx + Math.cos(rad) * (r - 4);
      const y2 = cy + Math.sin(rad) * (r - 4);
      const radCurve = ((angle + 25) * Math.PI) / 180;
      const cxCurv = cx + Math.cos(radCurve) * (r / 2);
      const cyCurv = cy + Math.sin(radCurve) * (r / 2);
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
      <g>
        {/* Fan shroud circle - Pure Line Art */}
        <circle cx={cx} cy={cy} r={r} stroke={primary} strokeWidth="1.8" fill="none" />
        {/* Rotating Blades and Hub */}
        <g className={styles.fanBlades}>
          {blades}
          <circle cx={cx} cy={cy} r="6.5" fill="none" stroke={accent} strokeWidth="1.8" />
          <circle cx={cx} cy={cy} r="2.5" fill="none" stroke={accent} strokeWidth="1.2" />
        </g>
      </g>
    );
  };

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
        viewBox="0 0 220 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Metal I/O Bracket */}
        <path d="M 12 8 L 22 8 L 22 84 L 12 84 Z" fill="none" stroke={primary} strokeWidth="1.8" />
        <line x1="8" y1="4" x2="16" y2="4" stroke={primary} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="17" cy="24" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />
        <circle cx="17" cy="48" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />

        {/* Main Shroud Body - Pure Line Art */}
        <rect
          x="22"
          y="12"
          width="190"
          height="66"
          rx="8"
          fill="none"
          stroke={primary}
          strokeWidth="2.2"
        />

        {/* Heatsink Fin Lines behind shroud cutouts */}
        {[30, 36, 42, 48, 102, 108, 114, 120, 174, 180, 186, 192].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="18"
            x2={x}
            y2="72"
            stroke={creamFaint}
            strokeWidth="1.2"
          />
        ))}

        {/* Dual Axial Cooling Fans (7 blades each) */}
        {renderFan(72, 45, 24)}
        {renderFan(146, 45, 24)}

        {/* 8-Pin PCIe Power Header on Top Edge */}
        <rect x="180" y="6" width="22" height="8" rx="2" fill="none" stroke={accent} strokeWidth="1.6" />
        <line x1="185" y1="6" x2="185" y2="12" stroke={accent} strokeWidth="1" />
        <line x1="191" y1="6" x2="191" y2="12" stroke={accent} strokeWidth="1" />
        <line x1="197" y1="6" x2="197" y2="12" stroke={accent} strokeWidth="1" />

        {/* PCIe x16 Edge Connector at Bottom */}
        <rect x="40" y="78" width="100" height="9" rx="1" fill="none" stroke={primary} strokeWidth="1.5" />
        <line x1="44" y1="83" x2="136" y2="83" stroke={gold} strokeWidth="3" strokeDasharray="3 2" />
      </svg>
    </div>
  );
}
