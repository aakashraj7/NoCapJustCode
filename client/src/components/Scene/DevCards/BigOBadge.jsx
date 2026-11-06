// client/src/components/Scene/DevCards/BigOBadge.jsx
import React from 'react';
import DevCard from './DevCard.jsx';
import styles from './DevCards.module.css';

export default function BigOBadge({
  floatVariant = 'C',
  parallaxFactor = -0.03,
  style = {},
  className = '',
}) {
  return (
    <DevCard
      name="bigO"
      floatVariant={floatVariant}
      parallaxFactor={parallaxFactor}
      className={`${styles.bigOBadge} ${className}`}
      style={style}
    >
      <span className={styles.bigOText}>O(n log n)</span>
      <svg className={styles.sparklineSvg} viewBox="0 0 40 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 2 15 Q 18 14 26 8 T 38 2" stroke="rgba(248, 187, 58, 0.85)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="38" cy="2" r="2" fill="var(--color-yellow, #f8bb3a)" />
      </svg>
    </DevCard>
  );
}
