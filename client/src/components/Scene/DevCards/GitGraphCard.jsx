// client/src/components/Scene/DevCards/GitGraphCard.jsx
import React from 'react';
import DevCard from './DevCard.jsx';
import styles from './DevCards.module.css';

export default function GitGraphCard({
  floatVariant = 'C',
  parallaxFactor = 0.035,
  style = {},
  className = '',
}) {
  return (
    <DevCard
      name="gitGraph"
      floatVariant={floatVariant}
      parallaxFactor={parallaxFactor}
      className={`${styles.gitGraphCard} ${className}`}
      style={style}
    >
      <div className={styles.gitGraphContent}>
        <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main branch line */}
          <line x1="10" y1="4" x2="10" y2="38" stroke="rgba(247, 237, 216, 0.35)" strokeWidth="1.8" />
          {/* Feature branch curve */}
          <path
            d="M 10 12 C 10 20, 32 14, 32 22 C 32 28, 10 24, 10 32"
            stroke="rgba(242, 107, 58, 0.8)"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Nodes */}
          <circle cx="10" cy="8" r="3" fill="#f7edd8" />
          <circle cx="32" cy="22" r="3" fill="#f26b3a" />
          <circle cx="10" cy="34" r="3" fill="#f7edd8" />
        </svg>
        <div className={styles.gitTags}>
          <span className={styles.gitTagPair}>feat/pair</span>
          <span className={styles.gitTagMain}>main</span>
        </div>
      </div>
    </DevCard>
  );
}
