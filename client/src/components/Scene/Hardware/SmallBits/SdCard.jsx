// client/src/components/Scene/Hardware/SmallBits/SdCard.jsx
import React from 'react';
import styles from '../Hardware.module.css';

export default function SdCard({
  size = 46,
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
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SD Card Outer Contour with Angled Cut Corner & Lock Notch */}
        <path
          d="M 12 7 L 31 7 L 37 13 L 37 39 Q 37 41 35 41 L 11 41 Q 9 41 9 39 L 9 20 L 7 19 L 7 16 L 9 15 L 9 9 Q 9 7 12 7 Z"
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Write Protect Switch Notch */}
        <rect x="6.5" y="16" width="3" height="3" stroke={color} strokeWidth="1" />
        {/* Gold Contact Finger Strips on Back */}
        <line x1="14" y1="11" x2="14" y2="19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="18" y1="11" x2="18" y2="19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="22" y1="11" x2="22" y2="19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="26" y1="11" x2="26" y2="19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="30" y1="15" x2="30" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="34" y1="16" x2="34" y2="22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}
