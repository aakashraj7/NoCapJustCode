// client/src/components/Scene/Hardware/RamStick.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

export default function RamStick({
  width = 175,
  height = 50,
  floatVariant = 'A',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const cream = `rgba(247, 237, 216, ${OPACITY.strokeStandard})`;
  const creamFaint = `rgba(247, 237, 216, ${OPACITY.strokeStandard * 0.7})`;
  const orange = `rgba(242, 107, 58, ${OPACITY.accent})`;
  const yellow = `rgba(248, 187, 58, ${OPACITY.accent})`;
  const fillCream = OPACITY.fillCream;

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
          fill={fillCream}
          stroke={cream}
          strokeWidth="1.8"
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
              stroke={cream}
              strokeWidth="1.2"
            />
            <circle cx={x + 3} cy="19" r="0.8" fill={creamFaint} />
            <line x1={x + 4} y1="24" x2={x + 13} y2="24" stroke={creamFaint} strokeWidth="1" />
          </g>
        ))}

        {/* Small SPD EEPROM Chip in Yellow Accent */}
        <rect
          x="77"
          y="20"
          width="7"
          height="8"
          rx="1"
          fill="none"
          stroke={orange}
          strokeWidth="1.2"
        />

        {/* Gold Contact Strip at Bottom with Key Notch */}
        {/* Left Finger Bank (x=16 to 76) */}
        <line x1="16" y1="41" x2="76" y2="41" stroke={yellow} strokeWidth="3" strokeDasharray="3 2" />
        {/* Center Key Notch */}
        <rect x="78" y="36" width="6" height="8" rx="1" fill="none" stroke={creamFaint} strokeWidth="1" />
        {/* Right Finger Bank (x=86 to 162) */}
        <line x1="86" y1="41" x2="162" y2="41" stroke={yellow} strokeWidth="3" strokeDasharray="3 2" />

        {/* Serpentine PCB Bus Traces */}
        <path d="M 20 13 H 155" stroke={creamFaint} strokeWidth="1" strokeDasharray="6 3" />
      </svg>
    </div>
  );
}
