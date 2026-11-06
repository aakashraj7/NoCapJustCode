// client/src/components/Hero/Marquee.jsx
import React from 'react';
import styles from './Hero.module.css';

export default function Marquee() {
  const words = ['LOCK IN', 'EXECUTE', 'NO LARPING', 'ONLY CODING'];

  return (
    <div className={styles.marqueeContainer} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {[...Array(2)].map((_, groupIdx) => (
          <div key={groupIdx} className={styles.marqueeGroup}>
            {words.map((word, idx) => (
              <span key={idx} className={styles.marqueeItem}>
                <span>{word}</span>
                <span className={styles.marqueeSeparator}>//</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
