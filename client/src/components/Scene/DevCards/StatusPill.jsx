// client/src/components/Scene/DevCards/StatusPill.jsx
import React from 'react';
import DevCard from './DevCard.jsx';
import styles from './DevCards.module.css';

export default function StatusPill({
  text = 'build passing',
  floatVariant = 'A',
  parallaxFactor = 0.025,
  style = {},
  className = '',
}) {
  return (
    <DevCard
      name="statusPill"
      floatVariant={floatVariant}
      parallaxFactor={parallaxFactor}
      className={`${styles.statusPill} ${className}`}
      style={style}
    >
      <span className={styles.greenDot} />
      <span className={styles.statusText}>{text}</span>
    </DevCard>
  );
}
