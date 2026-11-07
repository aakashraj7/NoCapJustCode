// client/src/components/Scene/Hardware/SmallBits/JumperPin.jsx
import React from 'react';
import styles from '../Hardware.module.css';

export default function JumperPin({
  size = 38,
  color = '#F26B3A',
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
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Plastic Shunt Body */}
        <rect x="7" y="10" width="24" height="18" rx="3" stroke={color} strokeWidth="2.2" />
        {/* Grip Ridges */}
        <line x1="13" y1="14" x2="13" y2="24" stroke={color} strokeWidth="1.2" />
        <line x1="19" y1="14" x2="19" y2="24" stroke={color} strokeWidth="1.2" />
        <line x1="25" y1="14" x2="25" y2="24" stroke={color} strokeWidth="1.2" />
        {/* Gold Metal Terminals extending bottom */}
        <line x1="12" y1="28" x2="12" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="28" x2="26" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
