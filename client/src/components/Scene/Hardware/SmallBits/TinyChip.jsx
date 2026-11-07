// client/src/components/Scene/Hardware/SmallBits/TinyChip.jsx
import React from 'react';
import styles from '../Hardware.module.css';

export default function TinyChip({
  size = 42,
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
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SOIC-8 Package Body */}
        <rect x="11" y="9" width="20" height="24" rx="2" stroke={color} strokeWidth="2.2" />
        {/* Pin 1 Index Notch */}
        <circle cx="15" cy="13" r="1.5" stroke={color} strokeWidth="1" />
        {/* 4 Leads Left */}
        <line x1="5" y1="13" x2="11" y2="13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="5" y1="18" x2="11" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="5" y1="23" x2="11" y2="23" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="5" y1="28" x2="11" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        {/* 4 Leads Right */}
        <line x1="31" y1="13" x2="37" y2="13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="31" y1="18" x2="37" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="31" y1="23" x2="37" y2="23" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="31" y1="28" x2="37" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}
