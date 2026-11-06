// client/src/components/Scene/Hardware/ScreenCode.jsx
import React, { useId } from 'react';
import styles from './Hardware.module.css';

/**
 * ScreenCode: Animated code sequence on Laptop and Monitor screens.
 * 10-second CSS loop with steps()-based typing and stroke-through cancellation:
 * - Line 1: types "if (larper) {" and gets an orange strike line
 * - Line 2: types "  return coder;" in orange
 * - Line 3: types "  // no larping" and gets an orange strike line
 * - Blinking cursor follows active line
 * - Low opacity matching the piece line art
 */
export default function ScreenCode({
  startX = 48,
  startY = 38,
  lineGap = 14,
  orange = '#F26B3A',
  cream = '#F7EDD8',
  faintCream = 'rgba(247, 237, 216, 0.45)',
}) {
  const reactId = useId().replace(/:/g, '');
  const clip1 = `clip1-${reactId}`;
  const clip2 = `clip2-${reactId}`;
  const clip3 = `clip3-${reactId}`;

  const y1 = startY;
  const y2 = startY + lineGap;
  const y3 = startY + lineGap * 2;
  const y4 = startY + lineGap * 3;
  const y5 = startY + lineGap * 3.8;

  return (
    <g className={styles.screenCodeGroup}>
      <defs>
        <clipPath id={clip1}>
          <rect x={startX} y={y1 - 10} width="0" height="15" className={styles.typeLine1} />
        </clipPath>
        <clipPath id={clip2}>
          <rect x={startX + 6} y={y2 - 10} width="0" height="15" className={styles.typeLine2} />
        </clipPath>
        <clipPath id={clip3}>
          <rect x={startX + 6} y={y3 - 10} width="0" height="15" className={styles.typeLine3} />
        </clipPath>
      </defs>

      {/* Line 1: "if (larper) {" */}
      <g clipPath={`url(#${clip1})`}>
        <text
          x={startX}
          y={y1}
          fill={cream}
          fontSize="9.5"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="500"
          letterSpacing="0.02em"
        >
          if (larper) &#123;
        </text>
      </g>
      {/* Line 1 Strike Line */}
      <line
        x1={startX}
        y1={y1 - 3}
        x2={startX + 78}
        y2={y1 - 3}
        stroke={orange}
        strokeWidth="1.8"
        strokeLinecap="round"
        className={styles.strike1}
      />

      {/* Line 2: "  return coder;" in orange */}
      <g clipPath={`url(#${clip2})`}>
        <text
          x={startX + 6}
          y={y2}
          fill={orange}
          fontSize="9.5"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="600"
          letterSpacing="0.02em"
        >
          return coder;
        </text>
      </g>

      {/* Line 3: "  // no larping" */}
      <g clipPath={`url(#${clip3})`}>
        <text
          x={startX + 6}
          y={y3}
          fill={faintCream}
          fontSize="9.5"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="500"
          fontStyle="italic"
          letterSpacing="0.02em"
        >
          // no larping
        </text>
      </g>
      {/* Line 3 Strike Line */}
      <line
        x1={startX + 6}
        y1={y3 - 3}
        x2={startX + 84}
        y2={y3 - 3}
        stroke={orange}
        strokeWidth="1.8"
        strokeLinecap="round"
        className={styles.strike3}
      />

      {/* Following Cursor */}
      <g transform={`translate(${startX}, ${y1 - 10})`}>
        <rect
          width="2"
          height="11"
          rx="0.5"
          fill={orange}
          className={styles.codeCursor}
        />
      </g>

      {/* Subtle Static Filler Bars for context */}
      <line
        x1={startX}
        y1={y4}
        x2={startX + 10}
        y2={y4}
        stroke={faintCream}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1={startX}
        y1={y5}
        x2={startX + 55}
        y2={y5}
        stroke={faintCream}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="12 4 18 4"
        opacity="0.3"
      />
    </g>
  );
}
