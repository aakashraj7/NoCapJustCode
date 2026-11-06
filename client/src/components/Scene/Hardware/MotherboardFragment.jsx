// client/src/components/Scene/Hardware/MotherboardFragment.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

export default function MotherboardFragment({
  width = 110,
  height = 110,
  floatVariant = 'C',
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
          fill={fillCream}
          stroke={cream}
          strokeWidth="1.6"
        />

        {/* Orthogonal 45° and 90° PCB Traces */}
        <path d="M 8 30 L 32 30 L 46 44 L 84 44" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <path d="M 8 36 L 30 36 L 42 48 L 74 48" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <path d="M 8 42 L 28 42 L 38 52 L 64 52" stroke={creamFaint} strokeWidth="1.3" fill="none" />

        <path d="M 44 8 L 44 26 L 56 38 L 88 38 L 88 78" stroke={orange} strokeWidth="1.5" fill="none" />
        <path d="M 52 8 L 52 22 L 62 32 L 96 32" stroke={creamFaint} strokeWidth="1.3" fill="none" />

        <path d="M 24 102 L 24 76 L 38 62 L 72 62" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <path d="M 30 102 L 30 80 L 42 68 L 82 68" stroke={yellow} strokeWidth="1.4" fill="none" />

        {/* Via Ring Pads with Center Drill Holes (diameter <= 3px) */}
        {[
          [32, 30],
          [46, 44],
          [84, 44],
          [44, 26],
          [88, 78],
          [38, 62],
          [72, 62],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.5" fill="none" stroke={cream} strokeWidth="1" />
            <circle cx={x} cy={y} r="0.8" fill={yellow} />
          </g>
        ))}

        {/* Surface-Mount Capacitor Blocks */}
        <rect x="68" y="16" width="10" height="6" rx="1" fill="none" stroke={cream} strokeWidth="1" />
        <line x1="71" y1="16" x2="71" y2="22" stroke={orange} strokeWidth="1" />

        <rect x="68" y="24" width="10" height="6" rx="1" fill="none" stroke={cream} strokeWidth="1" />
        <line x1="71" y1="24" x2="71" y2="30" stroke={orange} strokeWidth="1" />

        {/* Small IC SOIC-8 Chip */}
        <rect x="18" y="68" width="16" height="12" rx="1.5" fill="none" stroke={cream} strokeWidth="1.2" />
        <circle cx="21" cy="71" r="1" fill={orange} />
        <line x1="16" y1="71" x2="18" y2="71" stroke={cream} strokeWidth="1" />
        <line x1="16" y1="74" x2="18" y2="74" stroke={cream} strokeWidth="1" />
        <line x1="16" y1="77" x2="18" y2="77" stroke={cream} strokeWidth="1" />
        <line x1="34" y1="71" x2="36" y2="71" stroke={cream} strokeWidth="1" />
        <line x1="34" y1="74" x2="36" y2="74" stroke={cream} strokeWidth="1" />
        <line x1="34" y1="77" x2="36" y2="77" stroke={cream} strokeWidth="1" />
      </svg>
    </div>
  );
}
