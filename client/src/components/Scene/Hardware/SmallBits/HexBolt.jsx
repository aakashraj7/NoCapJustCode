// client/src/components/Scene/Hardware/SmallBits/HexBolt.jsx
import React from 'react';
import styles from '../Hardware.module.css';

export default function HexBolt({
  size = 40,
  color = '#F5A81C',
  opacity = 0.16,
  style = {},
  className = '',
  spinSpeed = 110,
}) {
  return (
    <div
      className={`${styles.smallBit} ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        animation: `spinLinearReverse ${spinSpeed}s linear infinite`,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagonal Head */}
        <polygon
          points="20,4 34,12 34,28 20,36 6,28 6,12"
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Inner Thread Hole Ring */}
        <circle cx="20" cy="20" r="9" stroke={color} strokeWidth="1.6" />
        {/* Hex Flange Accent */}
        <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}
