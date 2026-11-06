// client/src/components/Intro/PixelText.jsx
import React from 'react';
import { GLYPHS } from './introConstants.js';

/**
 * PixelText component renders text as crisp scalable vector SVG blocks.
 *
 * @param {string} text - The visible typed text string
 * @param {number} totalLength - The total length of the completed word to fix SVG viewBox
 * @param {string} variant - 'chunky' (top line with cell grids & offset outline echoes) or 'monoline' (bottom line)
 * @param {string} color - Primary block fill color
 * @param {string} gridColor - Cell border/gridline color
 * @param {string} echoColor - Stacked outline echo color (offset down-right)
 * @param {boolean} showCursor - Whether a blinking underscore cursor sits after the last letter
 * @param {string} cursorColor - Color of the cursor
 */
export default function PixelText({
  text = '',
  totalLength = 6,
  variant = 'chunky',
  color = '#F57546',
  gridColor = '#C95228',
  echoColor = '#7A280D',
  showCursor = false,
  cursorColor = '#FAA012',
}) {
  const cellW = 8;
  const cellH = 8;
  const glyphCols = 5;
  const glyphRows = 7;
  const letterSpacing = 2; // in cells
  const letterWidth = glyphCols * cellW;
  const stepX = (glyphCols + letterSpacing) * cellW;

  // Total width allocated based on totalLength (+ cursor space)
  const contentWidth = Math.max(totalLength, 1) * stepX + (showCursor ? stepX : 0);
  const contentHeight = (glyphRows + 3) * cellH; // Extra padding for echoes/cursor

  const letters = text.toUpperCase().split('');
  const isChunky = variant === 'chunky';

  return (
    <svg
      viewBox={`0 0 ${contentWidth} ${contentHeight}`}
      style={{
        width: '100%',
        maxWidth: `${contentWidth}px`,
        height: 'auto',
        display: 'block',
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      {/* 1. LAYERED SHADOW ECHOES (Outline only, offset down-right, chunky variant only) */}
      {isChunky &&
        [1, 2].map((echoIdx) => {
          const offsetX = echoIdx * 3.5;
          const offsetY = echoIdx * 3.5;
          return (
            <g
              key={`echo-${echoIdx}`}
              transform={`translate(${offsetX}, ${offsetY})`}
              fill="none"
              stroke={echoColor}
              strokeWidth="1.2"
              strokeLinejoin="round"
              opacity={echoIdx === 1 ? 0.85 : 0.55}
            >
              {letters.map((char, lIdx) => {
                const matrix = GLYPHS[char] || GLYPHS[' '];
                const startX = lIdx * stepX;

                return matrix.map((rowStr, rIdx) =>
                  rowStr.split('').map((val, cIdx) => {
                    if (val !== '1') return null;
                    return (
                      <rect
                        key={`echo-rect-${lIdx}-${rIdx}-${cIdx}`}
                        x={startX + cIdx * cellW}
                        y={rIdx * cellH}
                        width={cellW}
                        height={cellH}
                      />
                    );
                  })
                );
              })}
            </g>
          );
        })}

      {/* 2. MAIN PIXEL CELLS */}
      <g>
        {letters.map((char, lIdx) => {
          const matrix = GLYPHS[char] || GLYPHS[' '];
          const startX = lIdx * stepX;

          return (
            <g key={`letter-${lIdx}`}>
              {matrix.map((rowStr, rIdx) =>
                rowStr.split('').map((val, cIdx) => {
                  if (val !== '1') return null;
                  return (
                    <rect
                      key={`cell-${rIdx}-${cIdx}`}
                      x={startX + cIdx * cellW}
                      y={rIdx * cellH}
                      width={cellW}
                      height={cellH}
                      fill={color}
                      stroke={gridColor}
                      strokeWidth={isChunky ? 0.75 : 0.3}
                    />
                  );
                })
              )}
            </g>
          );
        })}

        {/* 3. ACTIVE CURSOR (Sits right after the last typed letter) */}
        {showCursor && (
          <g transform={`translate(${letters.length * stepX}, ${(glyphRows - 1) * cellH})`}>
            <rect
              x={0}
              y={2}
              width={letterWidth}
              height={cellH * 1.4}
              fill={cursorColor}
            >
              <animate
                attributeName="opacity"
                values="1;1;0;0;1"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        )}
      </g>
    </svg>
  );
}
