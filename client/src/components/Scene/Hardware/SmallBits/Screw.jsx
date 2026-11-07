// client/src/components/Scene/Hardware/SmallBits/Screw.jsx
import React from 'react';
import styles from '../Hardware.module.css';

export default function Screw({
  size = 36,
  color = '#F26B3A',
  opacity = 0.16,
  style = {},
  className = '',
  spinSpeed = 90,
}) {
  return (
    <div
      className={`${styles.smallBit} ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        animation: `spinLinear ${spinSpeed}s linear infinite`,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular Head */}
        <circle cx="18" cy="18" r="15" stroke={color} strokeWidth="2.2" />
        {/* Inner Counter-bore Ring */}
        <circle cx="18" cy="18" r="10" stroke={color} strokeWidth="1.2" strokeDasharray="4 2" />
        {/* Slotted Screw Drive */}
        <line x1="8" y1="18" x2="28" y2="18" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        <line x1="18" y1="11" x2="18" y2="25" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
