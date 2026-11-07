// client/src/components/Intro/ImageTypewriter.jsx
import React, { useId } from 'react';
import { LOGO_CANVAS_WIDTH, LOGO_CANVAS_HEIGHT, COLORS } from './introConstants.js';

/**
 * ImageTypewriter reveals real brand logo PNG images letter-by-letter
 * using SVG clip-paths and an active yellow underscore cursor overlay.
 *
 * @param {string} imageSrc - Source URL of the cropped typing PNG
 * @param {Array} boxes - Array of letter reveal boxes with { x, y, w, h, cursor }
 * @param {number} revealedCount - Number of revealed boxes (0 to boxes.length)
 * @param {boolean} showActiveCursor - Whether the typing cursor is actively blinking
 * @param {boolean} isComplete - When true (or in reduced motion), reveals all boxes immediately
 * @param {string} alt - Accessibility text
 */
export default function ImageTypewriter({
  imageSrc,
  boxes = [],
  revealedCount = 0,
  showActiveCursor = true,
  isComplete = false,
  alt = '',
}) {
  const clipId = useId().replace(/:/g, '');

  const totalBoxes = boxes.length;
  const activeCount = isComplete ? totalBoxes : Math.min(revealedCount, totalBoxes);

  // Intermediate typing head cursor (active while letters are typing)
  const isTyping = activeCount > 0 && activeCount < totalBoxes;
  const currentHeadBox = isTyping ? boxes[activeCount - 1] : null;

  // The last box (index totalBoxes - 1) is the underscore cursor
  const isCursorBoxRevealed = activeCount === totalBoxes;
  const cursorBox = totalBoxes > 0 ? boxes[totalBoxes - 1] : null;

  return (
    <svg
      viewBox={`0 0 ${LOGO_CANVAS_WIDTH} ${LOGO_CANVAS_HEIGHT}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        overflow: 'visible',
      }}
      role="img"
      aria-label={alt}
    >
      <defs>
        <clipPath id={clipId}>
          {isComplete ? (
            <rect x="0" y="0" width={LOGO_CANVAS_WIDTH} height={LOGO_CANVAS_HEIGHT} />
          ) : (
            boxes.slice(0, activeCount).map((box) => (
              <rect
                key={box.id}
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
              />
            ))
          )}
        </clipPath>
      </defs>

      {/* Real brand image with pure black background dissolved by mix-blend-mode: screen */}
      <image
        href={imageSrc}
        width={LOGO_CANVAS_WIDTH}
        height={LOGO_CANVAS_HEIGHT}
        clipPath={`url(#${clipId})`}
        style={{
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Intermediate typing head cursor (during letter reveal) */}
      {showActiveCursor && currentHeadBox && activeCount < totalBoxes - 1 && (
        <rect
          x={currentHeadBox.cursor.x}
          y={currentHeadBox.cursor.y}
          width={currentHeadBox.cursor.w}
          height={currentHeadBox.cursor.h}
          fill={COLORS.yellow}
        />
      )}

      {/* When fully revealed (cursor box included), blink the cursor using a dark cover */}
      {showActiveCursor && isCursorBoxRevealed && cursorBox && (
        <rect
          x={cursorBox.x}
          y={cursorBox.y}
          width={cursorBox.w}
          height={cursorBox.h}
          fill="#050507"
        >
          <animate
            attributeName="opacity"
            values="0;0;0;1;1;0"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
      )}
    </svg>
  );
}
