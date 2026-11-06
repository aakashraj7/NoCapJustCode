// client/src/components/Scene/Hardware/SmallBits/SingleKeycap.jsx
import React from 'react';
import styles from '../Hardware.module.css';

export default function SingleKeycap({
  size = 46,
  color = '#F5A81C',
  opacity = 0.16,
  glyph = ';',
  style = {},
  className = '',
}) {
  return (
    <div
      className={`${styles.smallBit} ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Keycap Outer Base */}
        <polygon
          points="7,10 39,10 42,38 4,38"
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Keycap Top Dish Inset */}
        <polygon
          points="12,14 34,14 36,30 10,30"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Character Glyph */}
        <text
          x="23"
          y="25"
          textAnchor="middle"
          fill={color}
          fontSize="11"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {glyph}
        </text>
      </svg>
    </div>
  );
}
