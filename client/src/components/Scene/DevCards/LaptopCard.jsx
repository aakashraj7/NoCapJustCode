// client/src/components/Scene/DevCards/LaptopCard.jsx
import React from 'react';
import DevCard from './DevCard.jsx';
import styles from './DevCards.module.css';

export default function LaptopCard({
  floatVariant = 'B',
  parallaxFactor = -0.035,
  style = {},
  className = '',
}) {
  const cream = 'rgba(247, 237, 216, 0.65)';
  const creamFaint = 'rgba(247, 237, 216, 0.35)';
  const orange = 'rgba(242, 107, 58, 0.9)';

  return (
    <DevCard
      name="laptop"
      floatVariant={floatVariant}
      parallaxFactor={parallaxFactor}
      className={`${styles.laptopCard} ${className}`}
      style={style}
    >
      <svg className={styles.laptopSvg} viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Laptop Screen Lid */}
        <rect x="25" y="10" width="150" height="92" rx="8" stroke={cream} strokeWidth="2" />
        <rect x="33" y="18" width="134" height="76" rx="4" stroke={creamFaint} strokeWidth="1" />
        {/* Camera Dot */}
        <circle cx="100" cy="14" r="1.5" fill={cream} />
        {/* 4 Lines of Code on Screen */}
        <line x1="42" y1="32" x2="86" y2="32" stroke={orange} strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="32" x2="128" y2="32" stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="48" y1="46" x2="142" y2="46" stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="48" y1="60" x2="114" y2="60" stroke={cream} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="42" y1="74" x2="72" y2="74" stroke={orange} strokeWidth="2" strokeLinecap="round" />
        {/* Blinking Cursor on Screen */}
        <line x1="78" y1="70" x2="78" y2="78" stroke={orange} strokeWidth="2" className={styles.cursor} />
        {/* Keyboard Base Baseplate */}
        <path
          d="M 6 106 L 30 102 L 170 102 L 194 106 Q 198 108 192 114 L 180 120 Q 174 122 160 122 L 40 122 Q 26 122 20 120 L 8 114 Q 2 108 6 106 Z"
          stroke={cream}
          strokeWidth="2"
          fill="rgba(11, 11, 13, 0.4)"
        />
        {/* Trackpad */}
        <rect x="82" y="108" width="36" height="10" rx="2" stroke={creamFaint} strokeWidth="1" />
        {/* Hinge Notch */}
        <line x1="75" y1="102" x2="125" y2="102" stroke={cream} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </DevCard>
  );
}
