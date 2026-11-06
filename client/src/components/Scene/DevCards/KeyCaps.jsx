// client/src/components/Scene/DevCards/KeyCaps.jsx
import React from 'react';
import DevCard from './DevCard.jsx';
import styles from './DevCards.module.css';

export default function KeyCaps({
  floatVariant = 'A',
  parallaxFactor = -0.03,
  style = {},
  className = '',
}) {
  return (
    <DevCard
      name="keyCaps"
      floatVariant={floatVariant}
      parallaxFactor={parallaxFactor}
      className={`${styles.keyCapsCard} ${className}`}
      style={style}
    >
      <span className={styles.keyCap}>Esc</span>
      <span className={styles.keyCap}>⌘ / Ctrl</span>
      <span className={`${styles.keyCap} ${styles.keyCapAccent}`}>Enter ↵</span>
    </DevCard>
  );
}
