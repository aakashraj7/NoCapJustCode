// client/src/components/Splash/PresentedBrandTag.jsx
import React from 'react';

/**
 * PresentedBrandTag:
 * Slanted cream parallelogram in the exact brand visual language of the logo's OR/BY tags.
 * Features:
 * - Slanted cream parallelogram with yellow/orange border containing "PRESENTED BY" in Press Start 2P pixel font
 * - Small yellow and white checkered square tiles on both sides
 * - Dashed yellow accent lines running outward ending in rounded corner brackets
 * - Sized to ~60% of the logo width with 20px gap above the logo
 */
export default function PresentedBrandTag({ className = '' }) {
  const yellow = '#FAA012';
  const cream = '#F9EDD2';
  const dark = '#0B0A0D';
  const white = '#FFFFFF';

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: 'clamp(240px, 62vw, 390px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 380 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        {/* Left Bracket & Dashed Line */}
        {/* Rounded bracket top corner: starts at x=18 y=8, goes to x=10, curves down to y=14, runs down to y=22 */}
        <path
          d="M 22 8 L 12 8 Q 6 8 6 14 L 6 22 L 14 22"
          stroke={yellow}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dashed line extending towards the tag */}
        <line
          x1="18"
          y1="22"
          x2="56"
          y2="22"
          stroke={yellow}
          strokeWidth="2.5"
          strokeDasharray="7 5"
          strokeLinecap="round"
        />

        {/* Right Bracket & Dashed Line */}
        <path
          d="M 358 8 L 368 8 Q 374 8 374 14 L 374 22 L 366 22"
          stroke={yellow}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="362"
          y1="22"
          x2="324"
          y2="22"
          stroke={yellow}
          strokeWidth="2.5"
          strokeDasharray="7 5"
          strokeLinecap="round"
        />

        {/* Left Checker Accent (slanted 2x3 grid) */}
        <g transform="skewX(-14) translate(10, 0)">
          {/* Top row */}
          <rect x="65" y="14" width="5.5" height="5.5" fill={yellow} />
          <rect x="71" y="14" width="5.5" height="5.5" fill={white} />
          <rect x="77" y="14" width="5.5" height="5.5" fill={yellow} />
          {/* Bottom row */}
          <rect x="65" y="20" width="5.5" height="5.5" fill={white} />
          <rect x="71" y="20" width="5.5" height="5.5" fill={yellow} />
          <rect x="77" y="20" width="5.5" height="5.5" fill={white} />
        </g>

        {/* Right Checker Accent (slanted 2x3 grid) */}
        <g transform="skewX(-14) translate(10, 0)">
          {/* Top row */}
          <rect x="293" y="14" width="5.5" height="5.5" fill={yellow} />
          <rect x="299" y="14" width="5.5" height="5.5" fill={white} />
          <rect x="305" y="14" width="5.5" height="5.5" fill={yellow} />
          {/* Bottom row */}
          <rect x="293" y="20" width="5.5" height="5.5" fill={white} />
          <rect x="299" y="20" width="5.5" height="5.5" fill={yellow} />
          <rect x="305" y="20" width="5.5" height="5.5" fill={white} />
        </g>

        {/* Slanted Cream Parallelogram (Center Tag) */}
        {/* Points calculated with 14 deg slant */}
        <polygon
          points="98,6 288,6 279,38 89,38"
          fill={cream}
          stroke={yellow}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner thin border highlight */}
        <polygon
          points="100,8.5 285.5,8.5 277,35.5 91.5,35.5"
          fill="none"
          stroke="rgba(250, 160, 18, 0.4)"
          strokeWidth="1"
        />

        {/* Pixel Font "PRESENTED BY" Text */}
        <text
          x="188.5"
          y="26.5"
          textAnchor="middle"
          fill={dark}
          fontFamily="'Press Start 2P', monospace"
          fontSize="11.5px"
          fontWeight="700"
          letterSpacing="0.06em"
        >
          PRESENTED BY
        </text>
      </svg>
    </div>
  );
}
