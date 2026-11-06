// client/src/components/Scene/Hardware/Sbc.jsx
import React from 'react';
import styles from './Hardware.module.css';
import { OPACITY } from '../hardwareConfig.js';

export default function Sbc({
  width = 125,
  height = 85,
  floatVariant = 'B',
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
          fill={fillCream}
          stroke={cream}
          strokeWidth="1.8"
        />
        <circle cx="15" cy="15" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />
        <circle cx="110" cy="15" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />
        <circle cx="15" cy="70" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />
        <circle cx="110" cy="70" r="2.5" stroke={creamFaint} strokeWidth="1.2" fill="none" />

        {/* 40-Pin GPIO Header (2x20 pins on top edge) */}
        <rect x="22" y="12" width="60" height="9" rx="1.5" fill="none" stroke={cream} strokeWidth="1.2" />
        {[...Array(18)].map((_, i) => (
          <g key={i}>
            <circle cx={25 + i * 3.2} cy="14.5" r="0.75" fill={yellow} />
            <circle cx={25 + i * 3.2} cy="18.5" r="0.75" fill={yellow} />
          </g>
        ))}

        {/* Main SoC Processor with Orange Heatsink */}
        <rect
          x="36"
          y="32"
          width="26"
          height="26"
          rx="3"
          fill="none"
          stroke={orange}
          strokeWidth="1.6"
        />
        <line x1="41" y1="36" x2="57" y2="36" stroke={orange} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="41" y1="42" x2="57" y2="42" stroke={orange} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="41" y1="48" x2="57" y2="48" stroke={orange} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="41" y1="54" x2="57" y2="54" stroke={orange} strokeWidth="1.3" strokeLinecap="round" />

        {/* Dual Stacked USB Ports on Right Edge */}
        <rect x="98" y="24" width="16" height="22" rx="2" fill="none" stroke={cream} strokeWidth="1.5" />
        <line x1="98" y1="35" x2="114" y2="35" stroke={cream} strokeWidth="1.2" />

        {/* Ethernet RJ45 Jack */}
        <rect x="98" y="50" width="16" height="20" rx="2" fill="none" stroke={cream} strokeWidth="1.5" />
        <circle cx="106" cy="66" r="1.5" fill={orange} />

        {/* HDMI Port on Bottom */}
        <rect x="36" y="71" width="16" height="6" rx="1.5" fill="none" stroke={cream} strokeWidth="1.3" />
      </svg>
    </div>
  );
}
