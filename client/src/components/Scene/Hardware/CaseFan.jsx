// client/src/components/Scene/Hardware/CaseFan.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

export default function CaseFan({
  width = 85,
  height = 85,
  floatVariant = 'A',
  hasHalo = true,
  haloStrong = false,
  className = '',
  style = {},
}) {
  const cream = `rgba(247, 237, 216, ${OPACITY.strokeStandard})`;
  const creamFaint = `rgba(247, 237, 216, ${OPACITY.strokeStandard * 0.7})`;
  const orange = `rgba(242, 107, 58, ${OPACITY.accent})`;
  const fillCream = OPACITY.fillCream;

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
        stroke={cream}
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
          fill={fillCream}
          stroke={cream}
          strokeWidth="1.8"
        />

        {/* 4 Corner Screw Holes */}
        <circle cx="14" cy="14" r="3" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <circle cx="71" cy="14" r="3" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <circle cx="14" cy="71" r="3" stroke={creamFaint} strokeWidth="1.3" fill="none" />
        <circle cx="71" cy="71" r="3" stroke={creamFaint} strokeWidth="1.3" fill="none" />

        {/* Circular Fan Cowling Duct */}
        <circle cx="42.5" cy="42.5" r="31" stroke={cream} strokeWidth="1.6" fill="none" />

        {/* 9 Aerofoil Blades */}
        {blades}

        {/* Center Motor Hub with Orange Accent */}
        <circle cx="42.5" cy="42.5" r="11" fill="none" stroke={orange} strokeWidth="1.6" />
        <circle cx="42.5" cy="42.5" r="4" fill={orange} />
      </svg>
    </div>
  );
}
