// client/src/components/Scene/Hardware/Cpu.jsx
import React from 'react';
import styles from './Hardware.module.css';

export default function Cpu({
  width = 95,
  height = 95,
  floatVariant = 'C',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const cream = 'rgba(247, 237, 216, 0.85)';
  const creamFaint = 'rgba(247, 237, 216, 0.35)';
  const orange = '#F26B3A';
  const fillDark = 'rgba(11, 11, 13, 0.9)';

  // 10 pins per side
  const pinPositions = [18, 24, 30, 36, 42, 48, 54, 60, 66, 72];

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
        viewBox="0 0 95 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outgoing PCB Circuit Traces */}
        {pinPositions.map((p, idx) => (
          <g key={idx}>
            {/* Top Traces */}
            <line x1={p} y1="0" x2={p} y2="10" stroke={creamFaint} strokeWidth="1" />
            {/* Bottom Traces */}
            <line x1={p} y1="85" x2={p} y2="95" stroke={creamFaint} strokeWidth="1" />
            {/* Left Traces */}
            <line x1="0" y1={p} x2="10" y2={p} stroke={creamFaint} strokeWidth="1" />
            {/* Right Traces */}
            <line x1="85" y1={p} x2="95" y2={p} stroke={creamFaint} strokeWidth="1" />
          </g>
        ))}

        {/* 10 Pins per side (extending outward) */}
        {pinPositions.map((p, idx) => (
          <g key={'pins-' + idx}>
            <line x1={p} y1="7" x2={p} y2="14" stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
            <line x1={p} y1="81" x2={p} y2="88" stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="7" y1={p} x2="14" y2={p} stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="81" y1={p} x2="88" y2={p} stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ))}

        {/* Outer Package Substrate */}
        <rect
          x="12"
          y="12"
          width="71"
          height="71"
          rx="6"
          fill={fillDark}
          stroke={cream}
          strokeWidth="2"
        />

        {/* Gold Corner Triangle Marker */}
        <polygon points="15,15 23,15 15,23" fill={orange} />

        {/* Inner Heat Spreader Die Square */}
        <rect
          x="26"
          y="26"
          width="43"
          height="43"
          rx="4"
          fill="rgba(18, 18, 22, 0.95)"
          stroke={cream}
          strokeWidth="1.8"
        />

        {/* Inner Diamond / Celestius Logo Mark in Orange */}
        <path
          d="M 47.5 35 L 56 47.5 L 47.5 60 L 39 47.5 Z"
          fill="none"
          stroke={orange}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="47.5" cy="47.5" r="2.5" fill={orange} />

        {/* Model Spec Tiny Mark */}
        <line x1="33" y1="64" x2="62" y2="64" stroke={creamFaint} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
