// client/src/components/Scene/Hardware/SmallBits/Standoff.jsx
import React from 'react';
import styles from '../Hardware.module.css';

export default function Standoff({
  size = 44,
  color = '#F5A81C',
  opacity = 0.16,
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
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Threaded Male Stud */}
        <rect x="18" y="4" width="8" height="8" stroke={color} strokeWidth="1.6" />
        <line x1="18" y1="7" x2="26" y2="7" stroke={color} strokeWidth="1" />
        <line x1="18" y1="10" x2="26" y2="10" stroke={color} strokeWidth="1" />

        {/* Hexagonal Brass Body */}
        <polygon
          points="22,12 36,20 36,36 22,42 8,36 8,20"
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Face Facet Creases */}
        <line x1="22" y1="12" x2="22" y2="42" stroke={color} strokeWidth="1.4" />
        <line x1="8" y1="20" x2="22" y2="28" stroke={color} strokeWidth="1" />
        <line x1="36" y1="20" x2="22" y2="28" stroke={color} strokeWidth="1" />
      </svg>
    </div>
  );
}
