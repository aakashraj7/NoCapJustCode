// client/src/components/Scene/DevCards/TerminalCard.jsx
import React from 'react';
import DevCard from './DevCard.jsx';
import styles from './DevCards.module.css';

export default function TerminalCard({
  floatVariant = 'A',
  parallaxFactor = 0.04,
  style = {},
  className = '',
}) {
  return (
    <DevCard
      name="terminal"
      floatVariant={floatVariant}
      parallaxFactor={parallaxFactor}
      className={`${styles.terminalCard} ${className}`}
      style={style}
    >
      <div className={styles.terminalHeader}>
        <span className={`${styles.dot} ${styles.dotAccent}`} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.terminalTitle}>bash</span>
      </div>
      <div className={styles.terminalBody}>
        <div className={styles.terminalLine}>
          <span className={styles.prompt}>$</span>
          <span>git commit -m &quot;locked in&quot;</span>
        </div>
        <div className={styles.terminalLine}>
          <span className={styles.passedCheck}>✓</span>
          <span>passed 12/12</span>
          <span className={styles.cursor}>_</span>
        </div>
      </div>
    </DevCard>
  );
}
