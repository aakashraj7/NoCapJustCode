// client/src/components/Scene/Hardware/ScreenCode.jsx
import React, { useId, memo } from 'react';
import styles from './Hardware.module.css';

/**
 * ScreenCode: Animated code sequence on Laptop and Monitor screens.
 * 10-second CSS loop with steps()-based typing and scaleX strike-through:
 * - Line 1: types "if (larper) {" then orange strike line draws across over 300ms
 * - Line 2: types "return coder;" in orange
 * - Line 3: types "// no larping" then orange strike line draws across over 300ms
 * - Holds 1.2s
 * - Screen fades out (200ms) and loop restarts from empty
 * - Blinking cursor follows active line
 * - Text height scaled to >= 9px when rendered
 */
function ScreenCode({
  startX = 48,
  startY = 38,
  lineGap = 14,
  orange = '#F26B3A',
  cream = 'rgba(247, 237, 216, 0.85)',
}) {
  const reactId = useId().replace(/:/g, '');
  const clip1 = `clip1-${reactId}`;
  const clip2 = `clip2-${reactId}`;
  const clip3 = `clip3-${reactId}`;

  const y1 = startY;
  const y2 = startY + lineGap;
  const y3 = startY + lineGap * 2;

  return (
    <g className={styles.screenCodeGroup}>
      <defs>
        <clipPath id={clip1}>
          <rect x={startX} y={y1 - 11} width="0" height="16" className={styles.typeLine1} />
        </clipPath>
        <clipPath id={clip2}>
          <rect x={startX + 6} y={y2 - 11} width="0" height="16" className={styles.typeLine2} />
        </clipPath>
        <clipPath id={clip3}>
          <rect x={startX + 6} y={y3 - 11} width="0" height="16" className={styles.typeLine3} />
        </clipPath>
      </defs>

      {/* Line 1: "if (larper) {" in cream 0.85 */}
      <g clipPath={`url(#${clip1})`}>
        <text
          x={startX}
          y={y1}
          fill={cream}
          fontSize="10"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="500"
          letterSpacing="0.02em"
        >
          if (larper) &#123;
        </text>
      </g>
      {/* Line 1 Strike Line: draws via scaleX from left over 300ms */}
      <line
        x1={startX}
        y1={y1 - 3.5}
        x2={startX + 82}
        y2={y1 - 3.5}
        stroke={orange}
        strokeWidth="1.8"
        strokeLinecap="round"
        className={styles.strike1}
        style={{ transformOrigin: `${startX}px ${y1 - 3.5}px` }}
      />

      {/* Line 2: "return coder;" in orange */}
      <g clipPath={`url(#${clip2})`}>
        <text
          x={startX + 6}
          y={y2}
          fill={orange}
          fontSize="10"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="600"
          letterSpacing="0.02em"
        >
          return coder;
        </text>
      </g>

      {/* Line 3: "// no larping" in cream 0.85 */}
      <g clipPath={`url(#${clip3})`}>
        <text
          x={startX + 6}
          y={y3}
          fill={cream}
          fontSize="10"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="500"
          fontStyle="italic"
          letterSpacing="0.02em"
        >
          // no larping
        </text>
      </g>
      {/* Line 3 Strike Line: draws via scaleX from left over 300ms */}
      <line
        x1={startX + 6}
        y1={y3 - 3.5}
        x2={startX + 86}
        y2={y3 - 3.5}
        stroke={orange}
        strokeWidth="1.8"
        strokeLinecap="round"
        className={styles.strike3}
        style={{ transformOrigin: `${startX + 6}px ${y3 - 3.5}px` }}
      />

      {/* Blinking Cursor following the active line */}
      <g transform={`translate(${startX}, ${y1 - 10})`}>
        <rect
          width="2"
          height="11"
          rx="0.5"
          fill={orange}
          className={styles.codeCursor}
        />
      </g>
    </g>
  );
}

export default memo(ScreenCode);
